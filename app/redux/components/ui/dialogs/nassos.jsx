import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	nassos_header:{
		id: "nassos_header",
		description: "Header",
		defaultMessage: "Athanasios (Nassos) Vafeidis"
	},
	nassos_p1:{
		id: "nassos_p1",
		description: "P - ",
		defaultMessage: "Nassos Vafeidis studied Surveying and Rural Engineering at the National Technical University of Athens. He went on to carry out a MSc degree in Physical at the University of London (King’s College) where he also earned his PhD in Physical Geography in 2001. After 7 years of research in the UK and Greece he joined the Christian-Albrechts-Universität zu Kiel in 2008 as a Junior Professor in coastal risk management in the Cluster of Excellence 'Future Ocean'."
	},
	nassos_p2:{
		id: "nassos_p2",
		description: "P - ",
		defaultMessage: "Since 2011 he is Professor in Coastal Systems and Hazards, leading the Coastal Risks and Sea-Level Rise research group in the Institute of Geography."
	},
	research:{
		id: "research",
		description: "Header - ",
		defaultMessage: "Research"
	},
	research_text:{
		id: "research_text",
		description: "P - ",
		defaultMessage: "Nassos's main research focus is the assessment of impacts of coastal hazards, with particular emphasis on how these impacts will be exacerbated by rising sea levels and increasing human pressure in coastal regions. His research to date includes the compilation of global spatial databases for coastal vulnerability analysis and the development of models for assessing the impacts of coastal hazards and accelerated sea-level rise on coastal land use. He is also involved in the development and application of the DIVA integrated assessment model."
	},
	publications:{
		id: "publications",
		description: "Header",
		defaultMessage: "Publications"
	}  

} )


const nassos = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<H priority={ 2 }>{ formatMessage( messages.nassos_header ) }</H>
			<P>{ formatMessage( messages.nassos_p1 ) }</P>
			<P>{ formatMessage( messages.nassos_p2 ) }</P>
			<H priority={ 3 }>{ formatMessage( messages.research ) }</H>
			<P>{ formatMessage( messages.research_text ) }</P>
			<H priority={ 3 }>{ formatMessage( messages.publications ) }</H>
			<P>NEUMANN, B., VAFEIDIS, A.T., ZIMMERMANN, J. and R. J. NICHOLLS (2015): Future Coastal Population Growth and Exposure to Sea-Level Rise and Coastal Flooding - A Global Assessment. In: PLoS ONE 10(3):e0118571.doi:10.1371/journal.pone.0118571</P>
			<P>BROWN, S., NICHOLLS, R.J., HANSON, S., BRUNDRIT, G., DEARING, J.A., DICKSON, M.E., GALLOP, S.L., GAO, S., HAIGH, I.D., HINKEL, J., JIMENEZ, J.A., KLEIN, R.J.T., KRON, W., LAZAR, A.N., NEVES, C.F., NEWTON, A., PATTIARATACHI, C., PAYO, A., PYE, K., SANCHEZ-ARCILLA, A., SIDDALL, M., SHAREEF, A., TOMPKINS, E.L., VAFEIDIS, A.T., VAN MAANEN, B., WARD, P.J. and C.D. WOODROFFE (2014): Shifting Perspectives on Coastal Impacts and Adaptation. In: Nature Climate Change 4(9), S. 752–755.</P>
			<P>HINKEL, J., LINCKE, D., VAFEIDIS, A.T., PERRETTE, M., NICHOLLS, R.J., TOL, R.S., MARZEION, B., FETTWEIS, X., IONESCU, C. and A. Levermann (2014): Coastal flood damage and adaptation costs under 21st century sea-level rise. In: Proceedings of the National Academy of Sciences 111(9), S. 3292–3297.</P>
			<P>KOERTH, J., VAFEIDIS, A.T., CARRETERO, S., STERR, H. and J. HINKEL (2014): A typology of household-level adaptation to coastal flooding and its spatio-temporal patterns. In: SpringerPlus 3(1), 466. doi:10.1186/2193-1801-3-466</P>
			<P>PAPAIOANNOU, E.A., VAFEIDIS, A.T., QUAAS, M.F., SCHMIDT, J.O. and H.V. STREHLOW (2014): Using indicators based on primary fisheries' data for assessing the development of the German Baltic small-scale fishery and reviewing its adaptation potential to changes in resource abundance and management during 2000-09. In: Ocean and Coastal Management 98, S. 38–50. doi:10.1016/j.ocecoaman.2014.06.005</P>
			<P>SCHUERCH, M., DOLCH, T., REISE, K. and A.T. VAFEIDIS (2014): Unravelling interactions between salt marsh evolution and sedimentary processes in the Wadden Sea (southeastern North Sea). In: Progress in Physical Geography 38 (6), S. 691-715, doi:10.1177/0309133314548746.</P>
			<P>HINKEL, J., NICHOLLS, R.J., TOL, R.S., WANG, Z.B., HAMILTON, J.M, BOOT, G., VAFEIDIS, A.T., MCFADDEN, L., GANOPOLSKI, A. and R.J. KLEIN (2013): A Global Analysis of Coastal Erosion of Beaches due to Sea-level Rise: An Application of DIVA. In: Global and Planetary Change 111, S. 150–158. doi:10.1016/j.gloplacha.2013.09.002</P>
			<P>SCHUERCH, M., VAFEIDIS, A., SLAWIG, T. and S. TEMMERMAN (2013): Modeling the influence of changing storm patterns on the ability of a salt marsh to keep pace with sea level rise. In: Journal of Geophysical Research Earth Surface 118, S. 84–96. doi:10.1029/2012JF002471.</P>
			<P>KOERTH, J., JONES, N., VAFEIDIS, A.T., DIMITRAKOPOULOS, P.G., MELLIOU, A., CHATZIIDIMITRIOU, E. and S. KOUKOUlLAS (2013): Household adaptation and intention to adapt to coastal flooding in the Axios - Loudias - Aliakmonas National Park, Greece. In: Ocean and Coastal Management 82, S. 42–50. doi: 10.1016/j.ocecoaman.2013.05.008</P>
			<P>KOERTH, J., VAFEIDIS, A.T., HINKEL, J. and H. STERR (2013): What motivates coastal households to adapt pro-actively to sea-level rise and increasing flood risk. In: Regional Environmental Change 13(4), S.897-909.</P>
			<P>SCHUERCH, M., RAPAGLIA, J., LIEBETRAU, V., VAFEIDIS, A. and K. REISE (2012): Salt marsh accretion and storm tide variation: An example from a barrier island in the North Sea. In: Estuaries and Coasts 35(2), S. 486–500.</P>
			<P>RÖMER, H., WILLROTH, P., KAISER, G., VAFEIDIS, A.T., LUDWIG, R., STERR, H. and J. REVILLA DIEZ J. (2012): Potential of remote sensing techniques for tsunami hazard and vulnerability analysis–a case study from Phang-Nga province, Thailand. In: National Hazards Earth System Sciences 12, S. 2103–2126.</P>
			<P>PAPAIOANNOU, E.A., VAFEIDIS, A.T., QUASS, M.F. and J.O. SCHMIDT (2012): The development and use of a spatial database for the determination and characterization of the state of the German Baltic small-scale fishery sector. In: ICES Journal of Marine Science: Journal du Conseil 69(8), S. 1480–1490.</P>
			<P>HINKEL, J., BROWN, S., EXNER, L., NICHOLLS, R.J., VAFEIDIS, A.T. and A.S. ABEBE (2012): Sea-level rise impacts in Africa and the effects of mitigation and adaptation: an application of DIVA. In: Regional Environmental Change 12(1), S. 207–224.</P>
			<P>LICHTER, M., VAFEIDIS, A.T., NICHOLLS, R.J and G. KAISER (2011): Exploring data-related uncertainties in analyses of land area and population in the Low Elevation Coastal Zone (LECZ). In: Journal of Coastal Research 27(4), S. 757–768. doi:10.2112/jcoastres-d-1000072.1</P>
			<P>HOUGHTON, K.J., VAFEIDIS, A.T., NEUMANN, B. and A. PROELSS (2010): Maritime boundaries in a rising sea. In: Nature Geoscience 3, S. 813–816.</P>
			<P>HINKEL, J., NICHOLLS, R.J., VAFEIDIS, A.T., TOL, R.S.J. and T. AVAGIANOU (2010): Assessing risk of and adaptation to sea-level rise in the European Union: an application of DIVA. In: Mitigation and Adaptation Strategies for Global Change 15(7), S. 703–719. doi:10.1007/s11027-010-9237-y.</P>
			<P>NICHOLLS, R.J, TOL, R.S.J. and A.T. VAFEIDIS (2008): Global estimates of the impact of a collapse of the West Antarctic Ice Sheet - An application of FUND. In: Climatic Change 91 (1-2), S. 171–191.</P>
			<P>VAFEIDIS, A.T., NICHOLLS, R.J., MCFADDEN, L., TOL, R.S.J., HINKEL, J., SPENCER, T., GRASHOFF, P.S., BOOT, G. and R.J.T. KLEIN (2008): A new global database for assessing the vulnerability of coastal zones to sea-level rise. In. Journal of Coastal Research 24(4), S. 917–924.</P>
			<P>LONSDALE, K.G., DOWNING, T.E., NICHOLLS, R.J., PARKER, D., VAFEIDIS, A.T., DAWSON, R.J. and J. HALL (2008): Plausible responses to the threat of rapid sea-level rise for the Thames Estuary. In: Climatic Change 91(1-2), S. 145–169.</P>
			<P>POUMADERE, M., MAYS, C., PFEIFLE, G. and A.T. VAFEIDIS (2008): Worst case scenario and stakeholder group decision: A 5-6 meter sea-level rise in the Rhone Delta, France. In: Climatic Change 91(1-2), S. 123–143.</P>
			<P>MCFADDEN, L., NICHOLLS, R.J., VAFEIDIS, A.T. and R.S.J. TOL (2007): A methodology for modeling coastal space for global assessment. In: Journal of Coastal Research 23(4), S. 911-920.</P>
			<P>TOL, R.S.J., BOHN, M., DOWNING, E.T., GUILLERMINET, M.L., HIZSNYIK, E., KASPERSON, R., LONSDALE, K., MAYS, C., NICHOLLS, R.J., OLSTHOORN, A.A., PFEIFLE, G., POUMADERE, M., TOHT, F.L., VAFEIDIS, A.T., VAN DER WERFF, P.E. and I.H. YETKINER (2006): Adaptation to five metres of sea-level rise. In: Journal of Risk Research 9(5), S. 467–48</P>
		</DIV>

	)

}

nassos.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( nassos )
