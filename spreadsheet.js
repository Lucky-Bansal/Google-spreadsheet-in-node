const GoogleSpreadSheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');          // Require the json file downloaded from google console

function printRowData(row) {
    console.log('============ : : ============')
    console.log('Panel : ', row.panel);
    console.log('Issue : ', row.issues);
    console.log('Path : ', row.path);
    console.log('QA Status : ', row.qastatus);
    console.log('Dev Status : ', row.devstatus);
    console.log('Dev Comment : ', row.devcomments? row.devcomments : "No comments");
    // console.log('============ : : ============')
}

async function accessSpreadsheet() {
    const doc = new GoogleSpreadSheet('<Your Sheet ID>');
    await promisify(doc.useServiceAccountAuth)(creds)
    const info = await promisify(doc.getInfo)();    // Info about all the sheets in the document in worsheet array
    const sheet = info.worksheets[2];
    
    // let rows = await promisify(sheet.getRows)({         //Get Rows Data by passing offset and limit .
    //     offset: 1,
    //     limit: 10,
    //     orderBy: 'allplatforms'
    // });

    let rows = await promisify(sheet.getRows)({         //Get Rows Data by passing offset and limit .
        query :"panel = Nothing"
    });

    console.log('number of rows :', rows.length);
    console.log(rows[0])                                    //Get all the names of the keys to access the data
    rows.forEach(row => {
        printRowData(row)
        row.reportedby = 'Shubham S'
        row.save()
        // row.del()
    });

    let row = {
        panel : 'Nothing',
        issues : 'For testing',
        path : 'to heaven',
        qastatus : 'single',
        devstatus : 'complicated',
        devcomments : 'nice pic'
    }
    await promisify(sheet.addRow)(row);

}

accessSpreadsheet();