import React, { useEffect, useState } from 'react';
import './App.scss';

const App = () => {

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>("")

  useEffect(() :void =>  {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch(err:any) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }  
    }
    getData()
  }, [])

  return (
    <div className="App">
      <h1>Canonical</h1>
      {loading && <i className="p-icon--spinner u-animation--spin"></i>}
      {error && (
        <div>{`Error fetching the data - ${error}`}</div>
      )}


      <div className="col-12">
        

    
        <div className="row u-equal-height u-clearfix">
        {data &&
          data.map(({title, date, link, featured_media, _embedded}:any, index:number) => (
            
            <div className="col-4 blog-p-card--post u-align--left" key={index}> 
            

                <header className="blog-p-card">
                <h5 className="p-muted-heading u-no-margin--bottom"> {_embedded["wp:term"][2][0] ? (_embedded["wp:term"][2][0].name) : "Ubuntu"} </h5>
                </header>
                
                <div className="p-card__inner"> 

                <img className="p-card__image" src={featured_media} alt="Blog" loading="lazy" />
                
                  <h3 className="p-heading--4">
                  <a href={link}>
                  {title.rendered}
                  </a>
                  </h3>
                 
                  
                  <p>
                  <em>
                  by <a href={_embedded.author[0].link}>{_embedded.author[0].name}</a> on {new Date(date).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </em>
                  </p>
                  
                  </div>
                  <p className="p-card__footer">
                  {_embedded["wp:term"][0][0].name}

                  </p>
                  
                  </div>

          

          ))}
          </div>
            </div>
            </div>

  );
}

export default App;