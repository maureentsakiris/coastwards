import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import BR from 'components/tags/br'

import style from './_imprint'

const messages = defineMessages( {

	imprint:{
		id: "imprint",
		description: "H - ",
		defaultMessage: "Imprint"
	},
	disclaimer:{
		id: "disclaimer",
		description: "H",
		defaultMessage: "Disclaimer"
	},
	privacy_policy:{
		id: "privacy_policy",
		description: "H - ",
		defaultMessage: "Privacy Policy"
	}


} )


const imprint = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >

			<TOGGLE priority={ 3 } text={ formatMessage( messages.imprint ) } className={ style.toggle } style={ { border: 'none' } } >
				<DIV dir="ltr">
					<H priority={ 4 }>Adresse</H>
					<P>Geographisches Institut, Christian-Albrechts-Universität zu Kiel</P>
					<P>Coastal Risks and Sea-Level Rise | Research Group</P>
					<P>Ludewig-Meyn-Str. 14</P>
					<P>24098 Kiel</P>
					<P>Germany</P>

					<H priority={ 4 }>Gesetzliche Vertretung</H>
					<P>Die Christian-Albrechts-Universität zu Kiel ist eine Körperschaft des Öffentlichen Rechts.</P>
					<BR/>
					<P>Sie wird gesetzlich vertreten durch das Präsidium:</P>
					<P>den Präsidenten Prof. Dr. Lutz Kipp</P>
					<P>den Vizepräsidenten Prof. Dr. Karin Schwarz</P>
					<P>die Vizepräsidentin Prof. Dr. Ilka Parchmann</P>
					<P>den Vizepräsidenten Prof. Dr. Anja Pistor-Hatam</P>
					<P>den Kanzler m.d.W.d.G.b. Ulf Holst</P>

					<H priority={ 4 }>Zuständige Aufsichtsbehörde:</H>
					<P>Ministerium für Soziales, Gesundheit, Wissenschaft und Gleichstellung (MSGWG) des Landes Schleswig-Holstein</P>
					<P>Adolf-Westphal-Str. 4, 24143 Kiel</P>

					<H priority={ 4 }>Umsatzsteueridentifikationsnummer:</H>
					<P>DE 811317279</P>

					<H priority={ 4 }>Verantwortlich im Sinne des Pressegesetzes:</H>
					<P>Das Präsidium</P>

					<H priority={ 4 }>Technische und inhaltliche Betreuung (Webmaster):</H>
					<P>Maureen Tsakiris</P>
					<P>Tel +49 (0431) 880-3429</P>
					<P>tsakiris[at]geographie.uni-kiel.de</P>
				</DIV>
			</TOGGLE>

			<TOGGLE priority={ 3 } text={ formatMessage( messages.disclaimer ) } className={ style.toggle }>
				<DIV dir="ltr">
					<H priority={ 4 }>Inhalt des Onlineangebotes</H>
					<P>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für Aktualität, Korrektheit oder Vollständigkeit der bereitgestellten Informationen. Alle Angebote sind freibleibend und unverbindlich. Wir behalten uns vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern oder zu ergänzen.</P>

					<H priority={ 4 }>Verweise und Links</H>
					<P>Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Wir haben keine positive Kenntnis über rechtswidrige Inhalte oder Verstöße dieser externen Websites. Wir haben keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten und machen uns die Inhalte nicht zu Eigen. Bei Kenntnis von Rechtsverstößen werden derartige externe Links unverzüglich gelöscht.</P>

					<H priority={ 4 }>Urheber- und Kennzeichenrecht</H>
					<P>Wir nutzen auf unserer Website nur eigenes oder zur Wiederverwendung freigegebenes Material. Das Copyright für veröffentlichte, von uns selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte bleibt allein bei uns, bzw. den jeweiligen Urhebern der Seite. Eine Vervielfältigung oder Verwendung solcher Objekte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung der Urheber nicht gestattet.</P>
					<BR/>
					<P>Hiervon ausgenommen sind die offiziellen Pressemitteilungen der Pressestelle und die dort für die Medien eingestellten Abbildungen: Diese Mitteilungen sollen zahlreich verwendet und vervielfältigt werden. Ausgenommen sind auch die beigetragenen Fotos von Küsten, die unter der Creative Commons CC0 1.0 Universell (CC0 1.0) Public Domain Dedication Lizenz in der öffentlichen Domäne stehen. </P>
				</DIV>

			</TOGGLE>

			<TOGGLE priority={ 3 } text={ formatMessage( messages.privacy_policy ) } className={ style.toggle }>
				<DIV dir="ltr">
					<P>Wir weisen ausdrücklich darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte geschützt werden kann. </P>
					<BR/>
					<P>Sofern innerhalb des Internetangebotes die Möglichkeit zur Eingabe persönlicher oder geschäftlicher Daten (Emailadressen, Namen, Anschriften) besteht, erfolgt die Preisgabe dieser Daten seitens des Nutzers auf ausdrücklich freiwilliger Basis. Wenn Sie über unsere Seiten konkrete Anfragen oder Informationen an uns übermitteln, verwenden wir mit Ihrer Einwilligung die Daten, die Sie in das entsprechende Formular oder die E-Mail eintragen und uns zur Bearbeitung senden. Eine Nutzung der Daten erfolgt nur, soweit dies zur Bearbeitung der Anfrage etc. erforderlich ist. In keinem Fall werden die erhobenen Daten verkauft oder aus Gründen, die das Datenschutzrecht nicht erlaubt, an Dritte weitergegeben.</P>
					<BR/>
					<P>Der Anbieter und alle auf dieser Website genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und Weitergabe ihrer Daten.</P>
					<BR/>	
					<P>Personenbezogenen Daten werden bei der Nutzung dieser Website nur insoweit verarbeitet, wie dies technisch oder nutzungsbedingt zwingend erforderlich ist.</P>
					<BR/>
					<P>Beim Zugriff auf unsere Website sendet Ihr Browser außerdem folgende Daten an uns, die in den Protokolldateien des Servers automatisch gespeichert werden: Browsertyp und -version, das verwendete Betriebssystem, ggf. die URL der zuvor besuchten Internetseite, die IP-Adresse des zugreifenden Rechners und die Uhrzeit der Anfrage.</P>
					<BR/>
					<P>Um unserer Beweispflicht nachzukommen, wird beim Hochladen eines Fotos die IP-Adresse des Teilnehmenden in unserer Datenbank gespeichert und mit dem Foto verknüpft. Die Speicherung und Verarbeitung dieser Daten geschieht im Einklang mit dem Datenschutzgesetz. Die erhobenen IP-Adressen werden vertraulich behandelt, innerhalb der Universität nur für den angegebenen Zweck erhoben und verwendet und nicht an Dritte weitergegeben.</P>
				</DIV>
			</TOGGLE>

		</DIV>

	)

}

imprint.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

}

export default injectIntl( imprint )
