# Artifacts Lab

A specialized platform for managing and rendering interactive visual components within a knowledge base, designed to enhance learning through visual engagement.

## Overview

Artifacts Lab transforms the Claude Artifact Runner into an educational platform that excels at:

- Managing large collections of visual and interactive components
- Creating engaging learning experiences for visual learners
- Rendering multiple components simultaneously within topics
- Building maintainable knowledge bases with visual elements

## Key Features

- **Visual Component Management**: Organize and render multiple interactive components
- **Topic-Based Structure**: Group related components into learning paths
- **Interactive Learning**: Support for various component types including:
  - Interactive diagrams
  - Visual demonstrations
  - Progress tracking
  - Knowledge checks
  - Practice exercises

## Tech Stack

Built with modern technologies for optimal performance:

- React 18 with TypeScript
- Vite for development
- Tailwind CSS + Shadcn UI
- Recharts for data visualization

#### Prerequisites

### Installing Node.js 20

#### On macOS (using Homebrew):

```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js 20
brew install node@20

# Link node@20
brew link node@20

# Verify installation
node --version  # Should show v20.x.x
```

#### On Windows:

1. Download the Node.js 20 LTS installer from [nodejs.org](https://nodejs.org)
2. Run the installer and follow the installation wizard
3. Open Command Prompt and verify:
   
   ```bash
   node --version
   ```

#### On Linux (Ubuntu/Debian):

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version
```

### Other Requirements

* npm (automatically installed with Node.js)
* Git for version control
  - macOS: `brew install git`
  - Windows: Download from [git-scm.com](https://git-scm.com)
  - Linux: `sudo apt-get install git`

## Getting Started

1. Clone the repository:
   
   ```bash
   git clone https://github.com/roadmaus/artifacts-lab.git
   cd artifacts-lab
   ```

[Rest of the README remains the same...]

1. Install dependencies:
   
   ```bash
   npm install
   ```

2. 

3. Start the development server:
   
   ```bash
   npm run dev
   ```

## Usage

### Adding Components to Knowledge Base

1. Place component files in the Topics directory
2. Follow the standard artifact format
3. Components are automatically indexed and available for rendering

### Managing Components

- Organize components by topic
- Create learning paths
- Monitor component performance
- Manage educational content

## Building for Production

```bash
npm run build
```

## License

This project is built upon the Claude Artifact Runner which is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 Cláudio Silva

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Attribution

This project is a fork of [Claude Artifact Runner](https://github.com/claudio-silva/claude-artifact-runner).
Original work by Cláudio Silva.

Educational platform enhancements copyright (c) 2024 [roadmaus]

## Troubleshooting

If you encounter issues:

1. Clear browser cache and restart the development server
2. Delete `node_modules` and run `npm install`
3. Verify Node.js version compatibility
4. Check console for error messages
