#!/bin/bash
cd "$(dirname "$0")"

for pdf_file in *.pdf; do
  node index-pdf "$pdf_file"
done

for jpg_file in *.jpg; do
  node index-jpg "$jpg_file"
done
