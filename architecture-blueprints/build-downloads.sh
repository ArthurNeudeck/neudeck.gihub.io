#!/bin/sh
# Rebuilds the zip downloads of the architecture blueprint pages from the Markdown sources.
set -e
cd "$(dirname "$0")/../docs/architecture"
mkdir -p downloads
rm -f downloads/architecture-blueprint-templates.zip downloads/aurora-example.zip
(cd blueprints && zip -qrX ../downloads/architecture-blueprint-templates.zip templates)
(cd blueprints && zip -qrX ../downloads/aurora-example.zip example)
ls -l downloads
