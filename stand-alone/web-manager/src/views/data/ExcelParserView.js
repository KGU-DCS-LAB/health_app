import axios from 'axios';

const readUploadFile = (e) => {
    const diseaseName = e.target.value.split("_")[2].split(".")[0];
    e.preventDefault();
    const xlsx = require('xlsx');
    const result = {}
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);

            result.diseaseName = diseaseName;
            result.statistics = [];
            const months = json[2];
            const total = json[4];
            let male = []
            let female = []
            for (let i = 2; i < 181; i += 5){
                const key = '__EMPTY_' + i;
                for (let k = 5; k < json.length; k++){
                    const datas = json[k]
                    if(datas.__EMPTY === '남'){
                        male.push({age: datas.__EMPTY_1, num: datas[key]})
                    }
                    if(datas.__EMPTY === '여'){
                        female.push({age: datas.__EMPTY_1, num: datas[key]})
                    }
                }
                result.statistics.push({month: months[key], count: {total: total[key], male: male, female: female}})
                male = [];
                female = [];
            }
            console.log(result);
            // console.log(json);
            postData(result)
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}

async function postData(result) {
    try {
      //응답 성공 
      const response = await axios.post('http://172.30.1.1:5000/statisticalDataRouter/save',{
            //보내고자 하는 데이터 
          data: result
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