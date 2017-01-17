import React, { PropTypes } from 'react'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'



const imprint = ( { className } ) => {

	return(

		<DIV className={ className } >
			<H priority={ 2 }>Impressum</H>

			<H priority={ 3 }>Verantwortlich für die Inhalte dieser Website</H>
			<P>Maureen Tsakiris, Athanasios Vafeidis</P>

			<H priority={ 3 }>Finanzierung</H>
			<P>Exzellenzcluster Future Ocean, Teilprojekt CP1556</P>

			<H priority={ 3 }>Kontakt</H>
			<P>Maureen Tsakiris</P>
			<P>E-mail: tsakiris@geographie.uni-kiel.de</P>

			<H priority={ 3 }>Adresse</H>
			<P>Geographisches Institut, Christian-Albrechts-Universität zu Kiel</P>
			<P>Coastal Risks and Sea-Level Rise | Research Group</P>
			<P>Ludewig-Meyn-Str. 14</P>
			<P>24098 Kiel</P>
			<P>Germany</P>
			<P>www.crslr.uni-kiel.de</P>


			<br/><br/>
			<H priority={ 2 }>Rechtliche Hinweise zur Haftung / Disclaimer</H>

			<H priority={ 3 }>Warnhinweis zu Inhalten</H>
			<P>Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Wir können Fehler und Unklarheiten jedoch nicht gänzlich ausschließen und übernehmen keine Gewähr für Vollständigkeit, Aktualität, Richtigkeit oder Qualität der auf dieser Website dargestellten Informationen. Wir haften nicht für Schäden materieller oder immaterieller Art, die durch die Nutzung dieser Webseite verursacht wurde sofern uns kein nachweislich vorsätzliches oder grob fahrlässiges Verhalten nachgewiesen werden kann.</P>

			<H priority={ 3 }>Externe Links</H>
			<P>Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Wir haben keine positive Kenntniss über rechtswiedrige Inhalte oder Verstöße dieser externen Websites. Wir haben keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten und machen uns die Inhalte nicht zu Eigen. Eine ständige Kontrolle der externen Links ist für uns ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.</P>

			<H priority={ 3 }>Urheber- und Leistungsschutzrechte</H>
			<P>Wir nutzen auf unserer Website nur eigenes oder zur Wiederverwendung freigegebenes Material. Bilder und Informationen externer Quellen sind als solche markiert.</P>


			<br/><br/>
			<H priority={ 2 }>Datenschutz</H>
			<P>Wir weisen ausdrücklich darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte geschützt werden kann. Der Anbieter und alle auf dieser Website genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und Weitergabe ihrer Daten.</P>

			<H priority={ 3 }>Personenbezogene Daten</H>
			<P>Bei der Benutzung dieser Website werden keine personenbezogene Daten gespeichert.</P>

		</DIV>

	)

}

imprint.propTypes = {

	className: PropTypes.string

}

export default imprint
