import React, {useState} from "react"


function GitHubUserFinder() {
    const initialuName =''
    const initialresponse = ''
    const[userName,setUserName] = useState(initialuName);
    const[res,setRes] = useState('');
    const[tab,settab] = useState();
    const [finalResult, updateFinalResult] = useState([]);

    const handleSubmit = async (evt) =>{
        evt.preventDefault()
        try {
            const resp = await fetch(('https://api.github.com/users/').concat(userName),{method:'GET'})
            let newResp = await resp.json();
            console.log(newResp)
            if (newResp.id){
                newResp = [newResp]
            }
            
            updateFinalResult(newResp);
            setUserName('')
                } catch (err) { 
              console.log('Request failed', err)
        }        
    }
  
    return(
    <form onSubmit={e => handleSubmit}>
        <label>
          Enter GitHub username:
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
        </label>
        <input type="submit" value="search" onClick={handleSubmit}/>
        <h1> </h1>
        
       {finalResult.length >0   && <div><table border='1'>
            <tr>
                <th>fullname</th>
                <th>login name</th>
                <th>Image</th>
            </tr>
            {finalResult.map(result => <tr>
                <td>{result.name || "N/A"}</td>
                <td>{result.login}</td>
                <td><img src={result.avatar_url}></img></td>
            </tr>)}
            
        </table></div>}

        </form>
        
      )
}

export default GitHubUserFinder