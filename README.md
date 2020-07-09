# excel-splitter

This repo includes a **node** script to read a *.xlsx* file and split it into multiple CSV files according to a user inputted record count.

### Requires

1. Node
2. NPM

### Install

1. Clone the repository onto your machine.
2. Place XLSX files to be processed into the **root directory** of the repository.
3. Open terminal and *cd* into **root directory**.
4. Run:
```
node index.js
```
5. Select a file to process using the arrow keys and hit *enter*.
6. Enter the maximum number of records you would like to appear in each CSV file. This will default to 100.
7. Enter a new directory name in which the ouput files will be saved. This will default to the basename of the XLSX file being processed.
8. View CSV files into the directory which has been created inside the repository.

##### Coming
- Search for XLSX files outside of repository
- Output files outside of the repository