+++
title = 'Setting Up a Python Environment'
date =  '2024-01-02T20:52:31-07:00'
authors = ['mslanker']
description = "Python environments are increasingly becoming a train wreck. Let's navigate the mess and set up a proper development environment."
draft = false

categories = ['Python']
tags = ['python', 'development', 'environment', 'virtual-env', 'setup', 'tutorial', 'best-practices']
featuredImage = 'featured.png'
+++

## Overview

I am constantly finding myself having to fight with my Python environment.  So we are going to attempt to go over some of the
basics in regards to setting up a Python environment and leveraging PipEnv to manage environments per project.

> This will only cover macOS for now.  If I get a chance to work on setting up a Python environment on Windows or Linux, I will update this article.

## Prequisites

New versions of macOS no longer ship with a version of Python pre-installed and for our purposes that is just fine.
However, this does mean we need some additional software to get us up and running.  Let's walk through the steps of getting
a package manager called [Homebrew](https://brew.sh) installed.