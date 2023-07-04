#!/usr/bin/env bash

# Function to rename the files
rename_files() {
  # Loop through each file in the directory
  for file in "$1"/*; do
    # Check if the file is a regular file
    if [[ -f "$file" ]]; then
      # Get the file name without extension
      filename=$(basename "$file" .tsx)
      
      # Create the new directory path
      new_dir="$1/$filename"
      
      # Check if the new directory already exists
      if [[ -d "$new_dir" ]]; then
        # Prompt the user for confirmation before overwriting
        read -p "Directory '$new_dir' already exists. Do you want to overwrite it? (y/n): " choice
        if [[ $choice == "y" ]]; then
          # Remove the existing directory
          rm -rf "$new_dir"
        else
          # Skip renaming this file
          continue
        fi
      fi
      
      # Create the new directory
      mkdir "$new_dir"
      
      # Move the file to the new directory with the desired name
      mv "$file" "$new_dir/index.tsx"
    fi
  done
}

# Function to display usage information
display_usage() {
  echo "Usage: $0 [directory_path]"
  echo "Example: $0 ./components"
}

# Check if the script is called with the -h or --help option
if [[ $1 == "-h" || $1 == "--help" ]]; then
  display_usage
  exit 0
fi

# Check if the directory path is provided as an argument
if [[ -z $1 ]]; then
  echo "Error: Directory path is missing."
  display_usage
  exit 1
fi

# Check if the directory exists
if [[ ! -d $1 ]]; then
  echo "Error: Directory '$1' does not exist."
  exit 1
fi

# Call the rename_files function with the provided directory path
rename_files "$1"