# Google-spreadsheet-in-node
In this tutorial, You will learn how to get data from google sheet and how to insert row, update a row and delete a row.

# Lets Begin

**First things first**

1. Login into your Google console account.

2. Create a project and name your project as you wish.

3. Enable **API AND SERVICES** in your account if not enabled.

4. Scroll down to the Google Drive API.

5. Click on the Enable button.

6. After enabling it Click on the CREATE CREDENTIALS.

7. Select Google Drive API and Web server from the two dropdown respectively.

8. Select Application Data in **What Data you will be accessing** and **, I am not using them** in other section.

9. Click on **What credentials do i need** button.

10. Give a name to your service account and select Prject>Editor.

11. Click on the Continue button.

12. On clicking continue button. It will download a json file. Save it in your working directory.

13. Now open this file, copy the **client_email** and give access to this email in google sheet.

> Getting into the code

Clone the repo and install **google-spreadsheet** npm module

```
const GoogleSpreadSheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json');
```

Here **client_secret** is the file that I downloaded from the google console on naming my service account.

Get your sheet ID from your google sheet. 
Example ![click image](https://screenshot69.s3.ap-south-1.amazonaws.com/Screenshot+from+2019-12-22+14-36-07.jpg)
)

```
async function accessSpreadsheet() {
   const doc = new GoogleSpreadSheet('<Your Sheet ID>');
    await promisify(doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[2];
}
accessSpreadsheet();
```

**Get all rows from the sheet**

 Add this  code to get all the rows staring from first element.
 >Note: To get limited number of rows pass limit in the object;
 
 > To get rows order by then pass the column name (without whitespace and all lowercase);
 
```
let rows = await promisify(sheet.getRows)({         //Get Rows Data by passing offset and limit .
        offset: 0,
    //  limit: 10
    //  orderBy: 'allplatforms'
});
```
**Get rows with specific value**

Add this code to get all the rows which have Nothing in panel column
>Note: You can add offset, limit and orderBy keys also in this to filter and sort the rows.

```
let rows = await promisify(sheet.getRows)({         //Get Rows Data by passing offset and limit .
        query :"panel = Nothing"
});
```

**Operation on each row**

Iterate through each row to access its cells and print them;

>To make a change to the row use the column as key and make change to that row and then call .save() function on that row.

>To delete a row call .del() function on that row.

```
rows.forEach(row => {
        printRowData(row)
        row.reportedby = 'Shubham S'
        row.save()
        // row.del()
});
 ```
 
 **Add a row in the sheet**
 
To add a row in the sheet define an object with the column name as key and value to be inserted in the cell as value to that key.

```
    await promisify(sheet.addRow)(row);
```
Call this function to add the row in the sheet.

I hope this will help you getting started with editing your spreadsheet using nodeJS.

Happy coding. :+1:
