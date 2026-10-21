---
title: "Designing the boundary between a Flask API and a React graph view"
slug: "designing-the-boundary-between-flask-and-react"
summary: "MediGraph renders a patient as relationships rather than rows. That meant deciding what the API is allowed to know about the graph."
status: "draft"
tags: ["Flask", "React", "Neo4j", "API design", "MediGraph"]
date: "2026-09-12"
readTime: "8 min"
---

MediGraph started as a patient dashboard and quietly became a knowledge graph
problem. A patient is not a row of columns — a patient is a set of
relationships, and the interesting questions are the ones that cut across
them.

Once that is true of the data model, it is true of the API too. The question
this post is about is what the Flask service is allowed to expose to the React
frontend.

## The failure mode

The obvious implementation is to let the frontend ask for whatever it wants
and have the backend pass graph queries straight through. It is fast to build,
and it works right up until you need to change the shape of the graph.

Then every screen that depended on the old shape breaks, and the frontend
turns into a second, worse place where query logic lives. The same traversal
written three slightly different ways in three components.

The alternative is more work up front: the API exposes a small number of
shapes that are meaningful to the product, and the graph stays behind the
service.

I went with the second.

## Three layers, three jobs

The backend ended up with a fairly clear separation:

**The graph layer** knows about nodes, relationships and traversal. It is the
only place Cypher is written. Every query that touches the graph lives in one
directory, which means the expensive ones can be found by reading files rather
than by grepping a controller for a string.

**The domain layer** turns graph results into the shapes the product actually
uses — a patient summary, a timeline of encounters, a list of related
conditions. This is where the interesting product decisions live, and it is
the layer I would write the tests against first.

**The API layer** is thin. It validates input, calls the domain layer, and
serialises. It contains no traversal logic, which is the constraint that keeps
the rest from drifting.

```
GET /api/patients/:id/summary
GET /api/patients/:id/encounters
GET /api/patients/:id/conditions
GET /api/encounters/:id/notes
```

## The one thing I got wrong

My first version of the domain layer returned graph nodes almost verbatim,
with a few renamed fields. It was fast to write and it leaked the graph
everywhere.

The tell was in the frontend. Once a component received a raw node, it wanted
to traverse it — "show me the patient's conditions, sorted by the date of the
most recent encounter". That is a graph question, and now it was being asked in
React, in a component, in a way nobody could index.

The fix was to make the domain layer return exactly what each screen needs,
including the ordering and filtering decisions. If a screen can ask a question
the API cannot answer without the client traversing the graph, the API is
missing something.

## Transcription stays on device

A separate constraint shaped the whole pipeline: clinical audio is
transcribed on device rather than being sent to a hosted speech service.

That has an obvious benefit for patient data and a less obvious one for
correctness. When transcription runs locally, the note that comes out of it is
the same note the doctor reviewed. There is no second system where the stored
transcript can differ from what was produced.

The cost is that the whole path from audio to structured note has to work
without a network round trip, which pushed a fair amount of the work into the
Flask service rather than into a queue-and-worker setup.

## What I would change

The API is still shaped around screens rather than around resources. That was
pragmatic when there were two screens. With more of them, a resource-oriented
layer under the domain layer would have been the better call — harder to start,
much easier to extend.

I also would not build the API before the domain layer next time. I built the
endpoints first, which meant the domain layer inherited the shape of a thin
controller instead of the shape of the product.
