import React, {useState} from "react"


function GitHubUserFinder() {
    const initialuName =''
    const[userName,setUserName] = useState(initialuName);
    const[finalResult, updateFinalResult] = useState(null);
    const[resTotal, updateResTotal] =useState(null);
    //const[loading,updateloading] = useState(false);
    const handleSubmit = async (evt) =>{
        evt.preventDefault()
        try {
            updateResTotal(-1)
            updateFinalResult([])
            
            const resp = await fetch(('https://api.github.com/search/users?q=').concat(userName), { method: 'GET'})
            let newResp = await resp.json();
            console.log(newResp)
            if (newResp.total_count>0) {
                newResp = newResp.items
                updateResTotal(newResp.length)
            }else{
                newResp = []
                updateResTotal(0)
            }

            newResp.map(async (result) =>  {
                let proxyurl = "https://cors-anywhere.herokuapp.com/"
                let url = result.url
                const resp = await fetch(proxyurl+url, { method: 'GET'})
                let res = await resp.json()

                let user = {"login":res.login, "name":res.name, "followers":res.followers, "following":res.following, "avatar_url":res.avatar_url, "public_repos":res.public_repos, "html_url":res.html_url}
                console.log(finalResult)
                updateFinalResult(prev =>[...prev, user])
            })
            
        } catch (err) {
            console.log('Request failed', err)
        }   
         
    }
    
  
    return(
        <div className="container">
            <div className="row">
                <h2>Search GitHub Account:</h2>
                <div id="custom-search-input">
                    <div className="input-group col-md-12">
                        <input type="text" className="search-query form-control" placeholder="Enter username" onChange={e => {setUserName(e.target.value)}} />
                        <span className="input-group-btn">
                            <button className="btn btn-danger" type="button">
                                <span className=" glyphicon glyphicon-search" onClick={handleSubmit}></span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <p></p>
            <p></p>
            {finalResult != null && finalResult.length < resTotal || resTotal==-1 && <h1>loading...</h1>}
            {finalResult != null && resTotal == 0 && <h1>user not found...</h1>}
            {finalResult != null && resTotal != 0 && finalResult.length == resTotal  && <div className="input-group col-md-12">
            {finalResult.map((result) => <a key={result.login} href={result.html_url} target="_blank"><div  className="card">
                <img src={result.avatar_url}></img>
                <h2>{result.login}</h2>
                <p>Fullname: {result.name || "N/A"}</p>
                <p>Followers:{result.followers}</p>
                <p>Following:{result.following}</p>
                <p>Number of public repos:{result.public_repos || "N/A"}</p>
                <h1></h1>
            </div></a>)}
            
        </div>}
        </div>
    
    
        
    )
}

export default GitHubUserFinder