#!/bin/bash

# Iterate over each PDF file in the current directory
for pdf_file in *.pdf; do
  # Execute the node command with the current PDF file
  node index-pdf "$pdf_file"
done
