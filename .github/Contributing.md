# WORK IN PROGRESS - INCOMPLETE GUIDE
# Welcome

Welcome to the DFD35X project repository. Thank you for your interest in contributing to the project. Full details and guidelines on how to ensure this project is managed well are included below.

## Ways to contribute
Contributors can only work on the programming aspects of the project, since 3D models and textures are *closed source*.    
You can contribute to the project in two ways: **avionics/displays and systems**. Avionics/displays are written in the react.js library and systems are written in rust.
## Avionics/Displays
### Required Software:
[Git](https://git-scm.com/downloads)    
[Node.js](https://nodejs.org/en/)    
[Visual Studio Code (Or an IDE of choice)](https://code.visualstudio.com/download)
### How to Get Started
1. Clone the GitHub repository, and put it in a suitable location on your drive.
2. Switch to the branch you would like to work on. Currently we have separate branches for the EFIS, ECAM, MFD, and OIS. You can work on any of those, or you can make a new instrument (more info on that below).
3. In the A35X folder, run `npm i --force` and then `npm run build` in the command line. This will install the `node_modules` and build the display files that are in the `src` folder.
4. Open MSFS, and build the project in dev mode, and load into an airport with this aircraft.
5. The source files for the displays are in `A35X/src/Instruments/src/`. If you want to work on any of the existing ones, you can switch to the corresponding branch and start working on it. If you want to work on a different display (FCU screens, ISIS, RMP) then you can create a new branch on your fork and create that folder. Add the config.json, index.tsx, and style.scss.
6. When you want to start working, run the command `npm run dev` in the A35X folder. This will automatically check for changes and rebuild when any changes are made. It's much faster than always just doing `npm run build`.
7. When you make changes, make sure the file is saved and resync the aircraft in the aircraft editor.
## Systems
Coming Soon.
## Help
If you require help with contributing to our project, please ask questions within the `#displays` or `#systems` channels in our discord server.

## Pull Requests

If you wish to add a new feature or you spot a bug that you wish to fix, **please open an issue for it first** on the [A35X issue tracker](https://github.com/Digital-Flight-Dynamics/DFD35X).

The work-flow for submitting a new pull request is designed to be simple, but also to ensure consistency from **all** contributors:
* Fork the project into your personal space on GitHub.com.
* Create a new branch (with a clear name of what is being changed).
* Add changes to CHANGELOG.md with credits to yourself.
* Commit your changes.
* When writing commit messages make sure they are clear about what has been changed.
* Push the commit(s) to your fork.
* Submit a pull request (PR) to the master branch.
* The PR title should describe the change that has been made.
* Follow the PR template and write as much detail as necessary for your changes and include documents/screenshots if needed.
* Be prepared to answer any questions about your PR when it is reviewed for acceptance.

## Expectations
As contributors and maintainers of this project, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, issues and other contributions that are not aligned to this Code of Conduct.
