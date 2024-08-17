import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [activities, setActivities] = useState([]);
  async function fetchy() {
    const data = await axios.get("https://bored.api.lewagon.com/api/activity");
    setActivities((prev) => [...prev, { ...data.data, collapsed: true }]);
  }

  useEffect(() => {
    setTimeout(() => fetchy(), 1000);
  }, []);

  function handleExpand(key) {
    setActivities((prev) =>
      prev.map((gulag) =>
        gulag.key === key ? { ...gulag, collapsed: !gulag.collapsed } : gulag
      )
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-200 p-8 rounded-lg w-4/5 md:w-3/5 lg:w-2/5">
      <button
        onClick={fetchy}
        className="px-2 py-1 my-4 bg-gray-500 hover:bg-gray-500/80  active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] shadow-md rounded-md font-semibold text-white"
      >
        <span className="bg-gradient-to-r from-blue-500 via-green-500 to-red-500 bg-clip-text text-transparent font-bold outline text-xl">
          Generate Activity
        </span>
      </button>
      {activities.length > 0 ? (
        <ul className="list-inside list-disc">
          {activities.map((activity) => (
            <div key={activity.key} className="mb-4">
              <li className="mb-4">
                {activity.activity}
                <button
                  className="px-2 py-1 ml-4 bg-gray-500 hover:bg-gray-500/80 active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] shadow-md rounded-md font-semibold text-white"
                  onClick={() => handleExpand(activity.key)}
                >
                  {activity.collapsed ? "Expand" : "Collapse"}
                </button>
              </li>

              {!activity.collapsed && (
                <ExpandableListItem activity={activity} />
              )}
            </div>
          ))}
        </ul>
      ) : (
        "Loading.. ><))))*>"
      )}
    </div>
  );
};

const ExpandableListItem = ({ activity }) => {
  return (
    <ul className="list-inside list-disc ml-8">
      <li>
        Type: {activity.type.slice(0, 1).toUpperCase() + activity.type.slice(1)}
      </li>
      <li>Participants: {activity.participants}</li>
      <li>Price: {activity.price}</li>
      <li>
        Link:{" "}
        <a href={activity.link} className="text-blue-500" target="_blank">
          {activity.link}
        </a>
      </li>
      <li>Key: {activity.key}</li>
      <li>Accessibility: {activity.accessibility}</li>
    </ul>
  );
};

export default App;
