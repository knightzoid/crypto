import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Badge, DropdownButton, Dropdown } from "react-bootstrap";
import { FaArrowUp, FaArrowDown, FaUser } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20litecoin%2C%20ripple%2C%20dogecoin"
        );
        setCoins(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoins();

    const intervalId = setInterval(fetchCoins, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Crypto Dashboard</h1>
        <DropdownButton id="user-dropdown" title={<FaUser />}>
          <Dropdown.Item>My Profile</Dropdown.Item>
          <Dropdown.Item href="/">Logout</Dropdown.Item>
        </DropdownButton>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const priceChange = coin.price_change_percentage_24h;
              const isPriceIncreased = priceChange > 0;

              return (
                <tr key={coin.id}>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td>{coin.name}</td>
                  <td>$ {coin.current_price.toFixed(2)}</td>
                  <td>
                    {isPriceIncreased ? (
                      <Badge variant="success">
                        <FaArrowUp />
                        {priceChange.toFixed(2)}%
                      </Badge>
                    ) : (
                      <Badge variant="danger">
                        <FaArrowDown />
                        {priceChange.toFixed(2)}%
                      </Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default Dashboard;
