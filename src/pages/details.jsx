import { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/table/table";
import { useEffectOnce } from "../customHooks/customHooks";
import { getCoinById } from "../services/api";
import { Spinner } from "react-bootstrap";

const Details = () => {
  const [coinDetails, setCoinDetails] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffectOnce(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await getCoinById(id);
        if (res.status === 200) {
          console.log(res.data);
          const obj = {
            name: { value: res.data.name, type: "string" },
            symbol: { value: res.data.symbol, type: "string" },
            hashing_algorithm: {
              value: res.data.hashing_algorithm,
              type: "string",
            },
            description: { value: res.data.description.en, type: "hidden" },
            market_capEur: {
              value: res.data.market_data.market_cap.eur,
              type: "string",
            },
            homepage: { value: res.data.links.homepage, type: "hidden" },
            genesis_date: { value: res.data.genesis_date, type: "string" },
          };
          setCoinDetails(obj);
        }
        setLoading(false)
      } catch (error) {
        alert("Something went wrong");
        console.log("Something went wrong", error);
      }
    }
    getData();
  }, [id]);

  return (
    <div>
      <h1>{coinDetails?.name.value}</h1>
      {/* <div dangerouslySetInnerHTML={{__html: coinDetails?.description}}></div> */}
      <iframe srcDoc={coinDetails?.description.value}></iframe>
      {coinDetails && <Table data={[coinDetails]} />}
      <div>
        {coinDetails?.homepage &&
          coinDetails.homepage.value.map((link, index) => (
            <a key={link + index} href={link} target="_blank">
              {link}
            </a>
          ))}
      </div>
      {loading && <Spinner animation="border" role="status" style={{position: "fixed", top: '50%', right: '50%'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
    </div>
  );
};

export default Details;