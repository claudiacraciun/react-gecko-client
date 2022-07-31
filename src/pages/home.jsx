import { useState } from 'react';
import { useEffectOnce } from '../customHooks/customHooks';
import { getCoinsMarkets } from "../services/api";

const Home = () => {
    const [coins, setCoins] = useState([]);

    useEffectOnce(() => {
        async function getData() {
            const res = await getCoinsMarkets();
            if(res.status === 200) {
                console.log(res)
                setCoins(res.data)
            }
            else{
            console.log(res);
            }
        }
        getData();
    })

    return(
        <div>Home</div>
    )
}

export default Home;