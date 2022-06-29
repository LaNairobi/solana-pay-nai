import React, { useState, useEffect } from "react";
import HeadComponent from '../components/Head';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Product from "../components/Product";
import CreateProduct from "../components/CreateProduct";


// Constants
const TWITTER_HANDLE = "ms_nairobi";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
// This will fetch the users' public key (wallet address) from any wallet we support
const { publicKey } = useWallet();
const isOwner = publicKey
  ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY
  : false;
const [creating, setCreating] = useState(false);
const [products, setProducts] = useState([]);

  const renderNotConnectedContainer = () => (
    <div>
      <div className="main-gif">
        <img src="https://media3.giphy.com/media/xUOxf8izqVvHEBhRO8/giphy.gif?cid=ecf05e47ys35ifv4ul7piizq088s55cdprvlbxv5u8544e4g&rid=giphy.gif&ct=g" alt="emoji" />
      </div>

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  );

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App">
      <HeadComponent />
      <div className="container">
        <header className="header-container">
          <p className="header"> La tienda lacrita de Nai 👽</p>
          <p className="sub-text">Aqui solo compra gente malandrita</p>

          {/* Make form public  */}
          {/* {isOwner && (
            <button
              className="create-product-button"
              onClick={() => setCreating(!creating)}
            >
              {creating ? "Close" : "Create Product"}
            </button>
          )} */}

{publicKey && (
            <button
              className="create-product-button"
              onClick={() => setCreating(!creating)}
            >
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}



        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
