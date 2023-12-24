+++
title = 'macOS Folder Actions - Dismiss Notifications'
date = '2021-06-01T15:01:57-05:00'
authors = ['masked_farter']
description = ''
draft = false
+++

## Context

I recently switched to a [CircuitPython](https://circuitpython.org)-powered [keyboard](https://makerdiary.com/collections/mechanical-keyboard). The upside is that CircuitPython exposes a virtual removable drive that contains the code (`code.py`) that will execute on the device.  In the case of the keyboard this involves setting up the keymaps, backlight, and some other more experimental features and settings. One downside to this setup is you need another keyboard to get yourself out of crashing changes to `code.py`. Then there's one other downside that's less critical but at least as equally annoying and the subject of this post. During the first week or two while assembling and configuring the keyboard, you'll likely unplug the keyboard a lot. And unless you're much more diligent than me, you'll end up with a wall of **DISK NOT EJECTED PROPERLY** notifications.

## Goals

* Prevent or cleanup these disk notifications for specific devices.
* Prefer something event-based rather than timer-based.

## Solution

### Script

Unfortunately, as is increasingly becoming the case, this required resorting to AppleScript and scraping UI elements. This script will look for specific UI elements within the "Notification Center" app and within those elements again filter for the specific text set at the top of the script. It will then pull the list of available actions on that UI element looking for a `Close` action and calling it.

{{< gist mcharo 59f86a5a630f44fd5fbe304d116b90fc >}}

### Folder Action Setup

I copied the above script to `~/Library/Scripts/Folder Action Scripts`. Then opened Finder and chose `Go > Go to Folder...` and went to `/`. You will probably need to tell Finder to show hidden files at this point, which is most easily done by tapping `Command + Shift + .` (that's a period).