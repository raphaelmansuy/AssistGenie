Create a bash script to rename the file such as [**/*/filename.tsx] in a directory to [**/*/filename/index.txs]

Example I have this directory

```
./components
  - Button.tsx
  - Card.tsx
  - Input.tsx
```

After running the script, it should be like this

```
./components
  - Button
    - index.tsx
  - Card
    - index.tsx
  - Input
    - index.tsx
```

The script should be able to run in any directory.

The script should get the directory path as an argument. the script must includes a -h or --help option that displays usage information.
If a directory with the name already exists, the script should prompt the user for confirmation before overwriting the directory.


The script below:


```bash
#!/bin/bash

# Your code here
```