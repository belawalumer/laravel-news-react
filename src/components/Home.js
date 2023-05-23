import React, { useState } from 'react';
import NewsFeed from './news/NewsFeed';
import OpenNews from './news/OpenNews';
import NewsCred from './news/NewsCred';

function Home() {
  const [activeTab, setActiveTab] = useState('News Api');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'News Api':
        return <NewsFeed />;
      case 'OpenNews':
        return <OpenNews />;
      case 'NewsCred':
        return <NewsCred />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-8">Most Reliable News!</h1>

      <div className="flex justify-center mb-8">
        <nav>
          <ul className="flex">
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === 'News Api' ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('News Api')}
            >
              News Api
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === 'OpenNews' ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('OpenNews')}
            >
              OpenNews
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                activeTab === 'NewsCred' ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('NewsCred')}
            >
              NewsCred
            </li>
          </ul>
        </nav>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
}

export default Home;
