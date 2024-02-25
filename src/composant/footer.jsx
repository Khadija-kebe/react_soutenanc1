import '@fortawesome/fontawesome-free'
import '../composant/footer.css'
const Footer = () => {
    return ( 
        <>
           <footer className="footer">
  	 <div className="containerfoot">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a href="#">Acceuil</a></li>
  	 				<li><a href="#">Sante</a></li>
  	 				<li><a href="#">Boutique</a></li>
  	 				<li><a href="#">Contact</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Obtenir de l'aide</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				
  	 				<li><a href="#">retourne</a></li>
  	 				<li><a href="#">status commande</a></li>
  	 				<li><a href="#">Options payment</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Vente en ligne</h4>
  	 			<ul>
  	 				<li><a href="#">Mouton</a></li>
  	 				<li><a href="#">Ladoum</a></li>
  	 				<li><a href="#">petit ladoum</a></li>
  	 				
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>Suivez nous sur</h4>
  	 			<div className="social-links">
  	 				<a href="#"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i className="fab fa-twitter"></i></a>
  	 				<a href="#"><i className="fab fa-instagram"></i></a>
  	 				<a href="#"><i className="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
        </>
     );
}
 
export default Footer;