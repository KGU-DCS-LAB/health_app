
const readUploadFile = (e) => {
    const diseaseName = e.target.value.split("_")[2].split(".")[0];
    console.log(diseaseName)
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
            result.patientCount = [];
            const months = json[2];
            const total = json[4];
            let male = []
            let female = []
            for (let i = 2; i < 181; i += 5){
                const key = '__EMPTY_' + i;
                for (let k = 5; k < json.length; k++){
                    const datas = json[k]
                    if(datas.__EMPTY === '남'){
                        console.log(datas[key])

                        male.push({age: datas.__EMPTY_1, num: datas[key]})
                    }
                    if(datas.__EMPTY === '여'){
                        female.push({age: datas.__EMPTY_1, num: datas[key]})
                    }
                }
                result.patientCount.push({month: months[key], count: {total: total[key], male: male, female: female}})
                male = [];
                female = [];
            }
            console.log(result.patientCount);
            console.log(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
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