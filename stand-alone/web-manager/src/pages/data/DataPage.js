import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import ExcelParserView from '../../views/data/ExcelParserView';

const data = {
  excel_parser:{
    html:<ExcelParserView/>,
  },
};

const DataPage = () => {
  const params = useParams();
  const menu = data[params.menu];

  return (
    <div>
        <Header/>
        {/* 이 자리에 container가 오지 않는 이유는 loading 페이지 간격아 어색하기 때문임 */}
        {menu ? (
            <>
              {menu.html}
            </>
        ) : (
            <p>존재하지 않는 메뉴입니다.</p>
        )}
    </div>
  );
};

export default DataPage;