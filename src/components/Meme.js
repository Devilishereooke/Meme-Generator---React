import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText : "",
        bottomeText : "",
        randomImage : "https://i.imgflip.com/30b1gx.jpg"
    })

    const [allMemeImages, setAllMemeImages] = React.useState([]);

    React.useEffect(() => {
        async function getmemes(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json();
            setAllMemeImages(data.data.memes);
        }

        getmemes();
        // fetch("https://api.imgflip.com/get_memes")
        //     .then(res => res.json())
        //     .then(data => setAllMemeImages(data.data.memes))
    },[])

    function handleClick(){
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => {
            return ({
                ...prevMeme,
                randomImage : url
            })
        });
    }

    function handleChange(event){
        const {name,value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    console.log(meme.topText);

    return (
        <main>
            <div className="form">
                <div>
                    <label className="form--label" htmlFor="top-text"> Top text</label>
                        <input
                            id="top-text"
                            type="text"
                            name="topText"
                            placeholder="Shut up"
                            className="form--input"
                            onChange={handleChange}
                        />
                </div>
                <div>
                    <label className="form--label" htmlFor="bottom-text"> Bottom text </label>
                    <input
                        id="bottom-text"
                        name="bottomText"
                        type="text"
                        placeholder="and take my money"
                        className="form--input"
                        onChange={handleChange}
                    />
                </div>
                <button
                    onClick={handleClick}
                    className="form--button"
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}