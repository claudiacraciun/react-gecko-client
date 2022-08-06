import { useState } from "react";
import { useEffectOnce } from "../customHooks/customHooks";
import { getCoinsMarkets } from "../services/api";
import Table from "../components/table/table";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const storredData = localStorage.getItem("page");
  const storedPage = storredData ? Number(storredData) : 1;
  
  const [coins, setCoins] = useState([]);
  const [pageNo, setPageNo] = useState(storedPage);

  const navigate = useNavigate();

  useEffectOnce(() => {
    async function getData() {
      const res = await getCoinsMarkets(pageNo);
      if (res.status === 200) {
        const filteredData = res.data.map((obj) => {
          return {
            id: { value: obj.id, type: "hidden"},
            image: { value: obj.image, type: "image"},
            name: { value: obj.name, type: "string"},
            symbol: { value: obj.symbol, type: "string"},
            current_price: { value: obj.current_price, type: "string"},
            high_24_hour_price: { value: obj.high_24h, type: "string"},
            low_24_hour_price: { value: obj.low_24h, type: "string"},
          };
        });
        setCoins(filteredData);
      } else {
        console.log(res);
      }
    }
    console.log(">>>>>", pageNo)
    localStorage.setItem("page", pageNo);
    getData();
  }, [pageNo]);

  const handlePrevBtn = () => {
    if(pageNo === 1)return;
    setPageNo(state => state - 1);
  }

  const handleNextBtn = () => {
    setPageNo(state => state + 1);
  }

  const handleSelectCoin = (coinObj) => {
    navigate(`/details/${coinObj.id.value}`);
  }

  return (
    <div>
      {coins.length > 0 && <Table data={coins} handleRowClick={handleSelectCoin}/>}
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={handlePrevBtn}></Pagination.Prev>
        <Pagination.Item>{pageNo}</Pagination.Item>
        <Pagination.Next onClick={handleNextBtn}></Pagination.Next>
      </Pagination>
    </div>
  );
};

export default Home;