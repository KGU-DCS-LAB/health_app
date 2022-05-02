import axios from 'axios';

const readUploadFile = (e) => {
    const diseaseName = e.target.value.split("_")[2].split(".")[0];
    e.preventDefault();
    const xlsx = require('xlsx');
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);

            postData(json, diseaseName)
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}

async function postData(result, diseaseName) {
    try {
      //응답 성공 
      const response = await axios.post('http://172.30.1.1:5000/statisticalDataRouter/save',{
            //보내고자 하는 데이터 
          data: result,
          diseaseName: diseaseName
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

const ExcelParserView = () => {
    return (
        <form>
            <label htmlFor="upload">Upload File</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
        </form>
    )
}
export default ExcelParserView;