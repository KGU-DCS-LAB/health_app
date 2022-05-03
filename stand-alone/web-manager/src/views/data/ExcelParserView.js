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
        const response = await axios.post('http://172.16.203.208:5000/statisticalDataRouter/save', {
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

const calcRate = () => {
    axios.get("http://172.16.203.208:5000/statisticalDataRouter/calcRate")
        .then(function (response) {
            // response  
        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function () {
            // 항상 실행
        });
}

const ExcelParserView = () => {
    return (
        <div>
            <form>
                <label htmlFor="upload">Upload File</label>
                <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                />
                {/* <button onClick={readUploadFile}>저장</button> */}
            </form>
            <button onClick={calcRate}>발병률 계산</button>
        </div>
    )
}
export default ExcelParserView;