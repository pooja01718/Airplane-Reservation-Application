const serverData = async () => {
    const data = await axios.get("https://flight-reservation-app.onrender.com/home/login/session")
    let res = data.data
    document.getElementById("firstname").innerHTML += res.firstname
    document.getElementById("lastname").innerHTML += res.lastname
    document.getElementById("phnumber").innerHTML += res.phnumber
    document.getElementById("email").innerHTML += res.email
    document.getElementById("user-info").innerHTML = res.firstname
}
serverData()
