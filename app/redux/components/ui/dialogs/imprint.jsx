import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import BR from 'components/tags/br'
import A from 'components/tags/a'

import LOGOS from 'containers/info/logos'

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
					<H priority={4}>Adresse</H>
					<P>Geographisches Institut, Christian-Albrechts-Universität zu Kiel</P>
					<P>Coastal Risks and Sea-Level Rise | Research Group</P>
					<P>Ludewig-Meyn-Str. 14</P>
					<P>24098 Kiel</P>
					<P>Germany</P>

					<H priority={4}>Gesetzliche Vertretung</H>
					<P>
						Die Christian-Albrechts-Universität zu Kiel ist eine Körperschaft
						des Öffentlichen Rechts.
					</P>

					<P>Sie wird gesetzlich vertreten durch das Präsidium:</P>
					<P>den Präsidenten Prof. Dr. Lutz Kipp</P>
					<P>den Vizepräsidenten Prof. Dr. Karin Schwarz</P>
					<P>die Vizepräsidentin Prof. Dr. Ilka Parchmann</P>
					<P>den Vizepräsidenten Prof. Dr. Anja Pistor-Hatam</P>
					<P>die Kanzlerin Claudia Ricarda Meyer</P>

					<H priority={4}>Zuständige Aufsichtsbehörde:</H>
					<P>Ministerium für Bildung, Wissenschaft und Kultur</P>
					<P>Brunswiker Straße 16-22, 24105 Kiel</P>

					<H priority={4}>Umsatzsteueridentifikationsnummer:</H>
					<P>DE 811317279</P>

					<H priority={4}>Verantwortlich im Sinne des Pressegesetzes:</H>
					<P>Das Präsidium</P>

					<H priority={4}>Technische und inhaltliche Betreuung (Webmaster):</H>
					<P>Maureen Tsakiris</P>
					<P>tsakiris[at]geographie.uni-kiel.de</P>
				</DIV>
			</TOGGLE>

			<TOGGLE priority={ 3 } text={ formatMessage( messages.disclaimer ) } className={ style.toggle }>
				<DIV dir="ltr">
					<H priority={3}>Haftungsausschluss</H>
					<H priority={4}>Inhalt des Onlineangebotes</H>
					<P>
								Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
								Haftung für Aktualität, Korrektheit oder Vollständigkeit der
								bereitgestellten Informationen. Alle Angebote sind freibleibend und
								unverbindlich. Wir behalten uns vor, Teile der Seiten oder das
								gesamte Angebot ohne gesonderte Ankündigung zu verändern oder zu
								ergänzen.
					</P>

					<H priority={4}>Verweise und Links</H>
					<P>
								Das Geographische Institut der Christian-Albrechts-Universität zu
								Kiel ist als Inhaltsanbieter für die eigenen Inhalte, die sie zur
								Nutzung bereit hält, nach den allgemeinen Gesetzen verantwortlich.
								Von diesen eigenen Inhalten sind Querverweise (externe Links) auf
								die von anderen Anbietern bereit gehaltenen Inhalte zu
								unterscheiden. Diese fremden Inhalte stammen nicht von dem
								Geographischen Instituts des Christian-Albrechts-Universität zu Kiel
								und spiegeln auch nicht die Meinung des Geographischen Instituts der
								Christian-Albrechts-Universität zu Kiel wider, sondern dienen
								lediglich der Information. Das Geographische Institut der
								Christian-Albrechts-Universität zu Kiel macht sich diese Inhalte
								nicht zu eigen.
					</P>

					<H priority={4}>Urheber- und Kennzeichenrecht</H>
					<P>
								Das Copyright für veröffentlichte, von uns selbst erstellte
								Grafiken, Tondokumente, Videosequenzen und Texte bleibt allein bei
								uns, bzw. den jeweiligen Autoren der Seiten. Eine Vervielfältigung
								oder Verwendung solcher Objekte in anderen elektronischen oder
								gedruckten Publikationen ist ohne aus­drückliche Zustimmung der
								Autoren nicht gestattet. Hiervon ausgenommen sind die offiziellen
								Pressemitteilungen der Pressestelle und die dort für die Medien
								eingestellten Abbildungen: Diese Mitteilungen sollen zahlreich
								verwendet und vervielfältigt werden.
					</P>
					<P>Ausgenommen sind auch die beigetragenen Fotos von Küsten, die unter der Creative Commons CC0 1.0 Universell (CC0 1.0) Public Domain Dedication Lizenz in der öffentlichen Domäne stehen. </P>
				</DIV>

			</TOGGLE>

			<TOGGLE priority={ 3 } text={ formatMessage( messages.privacy_policy ) } className={ style.toggle }>
				<DIV dir="ltr">
					<H priority={3}>Datenschutz</H>
					<P>
								Sofern innerhalb des Internetangebotes die Möglichkeit zur Eingabe
								persönlicher oder geschäftlicher Daten (Emailadressen, Namen,
								Anschriften) besteht, erfolgt die Preisgabe dieser Daten seitens des
								Nutzers auf ausdrücklich freiwilliger Basis.
					</P>

					<P>
								Wenn Sie über unsere Seiten konkrete Anfragen oder Informationen an
								uns übermitteln, verwenden wir mit Ihrer Einwilligung die Daten, die
								Sie in das entsprechende Formular oder die E-Mail eintragen und uns
								zur Bearbeitung senden. Eine Nutzung der Daten erfolgt nur, soweit
								dies zur Bearbeitung der Anfrage etc. erforderlich ist. In keinem
								Fall werden die erhobenen Daten verkauft oder aus Gründen, die das
								Datenschutzrecht nicht erlaubt, an Dritte weitergegeben.
					</P>

					<P>
								Andere personenbezogene Daten werden bei der Nutzung dieser Website
								nur insoweit verarbeitet, wie dies technisch oder nutzungsbedingt
								zwingend erforderlich ist. Beim Zugriff auf unsere Website sendet
								Ihr Browser außerdem folgende Daten an uns, die in den
								Protokolldateien des Servers automatisch gespeichert werden:
								Browsertyp und -version, das verwendete Betriebssystem, ggf. die URL
								der zuvor besuchten Internetseite, die IP-Adresse des zugreifenden
								Rechners und die Uhrzeit der Anfrage.
					</P>

					<P>
								Das Formular auf dieser Webseite lässt keine Rückschlüsse auf die
								ausfüllende Person zu. Die Teilnahme ist freiwillig und anonym.
					</P>

					<P>
								Auf dieser Website werden interaktive Karten des Anbieters Mapbox
								dargestellt. Hierzu können Cookies eingesetzt werden. Bei Cookies
								handelt es sich um kleine Textdateien, die lokal im Zwischenspeicher
								des Internet-Browsers des Seitenbesuchers gespeichert werden. Die
								Cookies ermöglichen unter anderem die Wiedererkennung des
								Internet-Browsers. Die Cookies können nicht dazu benutzt werden den
								Besucher dieser Website persönlich zu identifizieren.{' '}
					</P>

					<H priority={4}>Welche Rechte haben Sie?</H>
					<P>Sie haben ein Recht darauf,</P>
					<ul>
						<li>
									eine Einwilligung zu widerrufen oder der Verarbeitung Ihrer
									Daten zu widersprechen.
						</li>
						<li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten.</li>
						<li>dass unrichtige Daten über Sie bei uns berichtigt werden.</li>
						<li>
									dass nicht mehr erforderliche Daten über Sie bei uns gelöscht
									werden.
						</li>
						<li>
									dass unter bestimmten Bedingungen die Verarbeitung Ihrer Daten
									eingeschränkt wird. Das kann beispielsweise der Fall sein, wenn
									z. B. eine Löschung nicht möglich ist, die Daten aber nicht
									weiter verarbeitet werden dürfen.
						</li>
						<li>
									dass Ihre Daten übertragbar sind. Dieses Recht gilt insbesondere
									dann, wenn Sie zur Verarbeitung Ihrer Daten eine Einwilligung
									gegeben haben ober wenn die Verarbeitung der Daten notwendig
									ist, um einen Vertrag zu erfüllen. Das Recht auf
									Datenübertragbarkeit besteht nicht, soweit Ihre Daten im Rahmen
									der gesetzlichen Aufgabenerfüllung verarbeitet werden.
						</li>
						<li>
									sich bei einer Aufsichtsbehörde zu beschweren. Wenn Sie der
									Meinung sind, dass die Verarbeitung Ihrer Daten gegen die
									gesetzlichen Vorgaben verstößt, können Sie sich bei uns
									beschweren. Dazu können Sie auch das Beschwerdeformular
									verwenden, das Sie auf unserer Webseite finden.
						</li>
					</ul>
					<P>
								Wenn Sie ein Recht ausüben möchten, dann nehmen Sie Kontakt{' '}
						<A href="https://www.datenschutzzentrum.de/datenschutzerklaerung/#01_00" target="_blank">
									mit uns{' '}
						</A>
								oder mit unserer{' '}
						<A href="https://www.datenschutzzentrum.de/datenschutzerklaerung/#01_01" target="_blank">
									behördlichen Datenschutzbeauftragten
						</A>{' '}
								auf. Wir möchten Sie darauf hinweisen, dass wir in bestimmten Fällen
								möglicherweise zusätzliche Informationen bei Ihnen anfordern, um
								Ihre Identität festzustellen. So können wir z. B. bei der
								Wahrnehmung des Auskunftsanspruchs sicherstellen, dass Informationen
								nicht an unbefugte Personen herausgegeben werden.“
					</P><BR/>
					<P>Um unserer Beweispflicht nachzukommen, wird beim Hochladen eines Fotos die IP-Adresse des Teilnehmenden in unserer Datenbank gespeichert und mit dem Foto verknüpft. Die Speicherung und Verarbeitung dieser Daten geschieht im Einklang mit dem Datenschutzgesetz. Die erhobenen IP-Adressen werden vertraulich behandelt, innerhalb der Universität nur für den angegebenen Zweck erhoben und verwendet und nicht an Dritte weitergegeben.</P>
				</DIV>
			</TOGGLE>

			<LOGOS />

		</DIV>

	)

}

imprint.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

}

export default injectIntl( imprint )
