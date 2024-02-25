import '../composantAdmin/khadija.css';
const Khadija = () => {
    return (
        <>
            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Les commandes</h2>
                        <a href="#" className="btn">View All</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>NomAnimal</td>
                                <td>Prix</td>
                                <td>Adresse_livraison</td>
                                <td>Prenom_client</td>
                                <td>Nom</td>
                                <td>Numero_tel</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status delivered">Delivered</span></td>
                            </tr>

                            {/* Add more order rows as needed */}
                        </tbody>
                    </table>
                </div>

                <div className="recentCustomers">
                    <div className="cardHeader">
                        <h2>Recent Customers</h2>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>David <br /><span>Italy</span></h4>
                                </td>
                            </tr>

                            {/* Add more customer rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Khadija;
