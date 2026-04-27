import { BreakingNewsItem } from "@/lib/types/return-types";
import { faBolt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BreakingNews({breakingNews}: {breakingNews: BreakingNewsItem}) {
  const {summary, urgent} = breakingNews;
  return (
    <>
      {breakingNews &&
      <section className="dark:bg-gray-800 bg-gray-300 text-black dark:text-gray-100 py-4 text-sm">
        <div className="container">
          {urgent ? <span><FontAwesomeIcon icon={faBolt} className="text-yellow-500 mr-2" /> <span className="bg-white text-black rounded-xl font-bold px-2 uppercase mr-2">Urgent</span></span> 
          
          : <span><FontAwesomeIcon icon={faNewspaper}  className="textwhite mr-2" /><span className="bg-white text-black rounded-xl font-bold px-2 uppercase mr-2">Breaking</span></span>}
          {summary}
        </div>
      </section>
      }
    </>
  );
}