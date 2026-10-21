---
title: "Building a desktop shell in QML instead of wiring one together"
slug: "building-a-desktop-shell-in-qml"
summary: "Why I threw away my bars, panels and widgets and rebuilt the whole desktop shell in QML on top of Quickshell and Hyprland."
status: "draft"
tags: ["QML", "Quickshell", "Hyprland", "Wayland", "Arch Linux"]
date: "2026-07-18"
readTime: "7 min"
---

Every Linux desktop I have used has been assembled out of pieces that were not
designed to meet. A bar here, a notification daemon there, a control centre
somebody else's idea of what a control centre should be. Each piece is fine on
its own. Together they never quite agree.

My Arch setup had reached the point where every screenshot I took of someone
else's desktop made me feel like I was looking at someone else's computer. So I
started rebuilding it.

## The decision

The conventional approach is to keep the standard panels and restyle them.
Waybar is excellent at that, and it is what my dotfiles still use for the
status bar.

The alternative is to write the shell yourself: the bar, the launcher, the
notification surface, the control centre, the workspace switcher, the volume
and brightness overlays. All of it, with a single design language and a single
place where behaviour lives.

That is a much larger commitment. It is also the only version where the desktop
ends up feeling like it belongs to the person using it.

```qml
// modules/bar/Bar.qml
ShellModule {
    id: root

    property var workspaces: Hyprland.workspaces
    property int activeWorkspace: Hyprland.activeWorkspace

    anchors { top: true; left: true; right: true }
    implicitHeight: 38

    // Layout is delegated to the widgets, not hard-coded here.
    RowLayout {
        anchors.fill: parent
        spacing: 12
    }
}
```

## Why QML specifically

Qt's declarative UI is the closest thing I have found to writing a desktop
shell the way you write a web page. You describe the structure and the
bindings; the runtime keeps the tree in sync with the state underneath it.

Quickshell adds the parts Qt leaves to you: Wayland layer-shell surfaces, so
panels can be anchored to specific edges and reserved out of the normal layout
space, and Hyprland IPC, so the shell can read the compositor's actual state
rather than guessing at it.

That last point matters more than it sounds. A shell that shows stale
information is worse than no shell, because it is confidently wrong. Reading
the workspace list from Hyprland directly means the indicator is true by
construction.

## Structure

The second version of this project is organised as:

```
shell.qml        # entry point — wires the modules together
modules/         # bar, launcher, notifications, overlays
widgets/         # reusable pieces used across modules
styles/          # theming, colours, metrics
```

The split between `modules/` and `widgets/` was the decision I got wrong the
first time. My first attempt mixed them: a "module" would reach into a widget
and change its internals. Nothing was reusable, and a theme change meant
touching everything.

The rule I settled on is simple. A **module** owns a region of the screen and
knows about the compositor. A **widget** draws something and exposes
properties. Modules compose widgets; widgets never know they are in a module.

Once that line is clean, adding a panel is genuinely small. Adding a theme
variant is smaller.

## What I would do differently

The first version was written as one large file. It was faster to write and
much harder to change. Splitting it earlier — before there was anything worth
splitting — would have saved me a rewrite.

The second thing I would change is testing. There is no test suite, and that
is the part of this project I am least comfortable with. Most of the shell is
declarative, which means a lot of it can be exercised by loading the QML and
asserting on the tree, rather than by driving a compositor. I should have
built that harness first.

## Where it landed

The current shell is used every day. It is not finished — the control centre
is still a grid of buttons rather than anything I would call designed — but
it is mine, it does what I want, and the architecture is one I can keep
extending without rewriting.

The repository is private, since it is built purely for my own use, but the
code is in the linked project if you want to see the shape of it.
