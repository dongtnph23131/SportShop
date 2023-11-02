type Props = {}

const HeaderAdmin = (props: Props) => {
  return (
    <div>
        <header style={{display: "flex", justifyContent: "space-between" , maxHeight: 100, padding: "10px 30px", alignItems: "center", borderBottom: "1px solid #eee"}}>
            <div className="logo__ssShop" style={{fontWeight: "bold" , fontSize: 40}}>Sports <span style={{fontSize: 25, fontWeight:400, color: "#4FB68D"}}>Shop</span></div>
            <div className="avt__admin" style={{borderRadius: "50%", overflow: "hidden", width:50}}><img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" /></div>
        </header>
    </div>
  )
}

export default HeaderAdmin