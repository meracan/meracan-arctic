export default {
  version:"V0.2",
  definitions:{
    "moreinfo":"Click node for more info",
    "NodeID":"NodeID",
    "Longitude":"Longitude",
    "Latitude":"Latitude",
    "Bed Elev.":"Bed Elevation",
    "Speed":"Average Tidal Current Speed",
    "AEP":"Annual Energy Production",
    "m":"m",
    "m/s":"m/s",
    "MWh/y":"Megawatt-hour per year",
    "MWh/year":"Megawatt-hour per year",
  },
  about:{
    intro:"The {text=National Research Council Canada,hyperlink=https://nrc.canada.ca/en/research-development/research-collaboration/research-centres/ocean-coastal-river-engineering-research-centre} has developed the Marine Energy Resources Atlas Canada (Arctic) application to map tidal flows and hydrokinetic energy near communities in northern Canada. The application allows users to investigate and assess the potentially exploitable tidal energy resources by providing spatially and temporally varying data such as tidal height, tidal currents, bed elevation and annual energy production.  The web application was developed using various packages such as {text=React,hyperlink=https://reactjs.org/}, {text=Mapbox,hyperlink=https://www.mapbox.com/} and {text=DeckGL,hyperlink=https://deck.gl/}, and is currently stored and delivered using {text=AWS,hyperlink=https://aws.amazon.com/} technologies.",
    documentation:"The National Research Council (NRC) has investigated and quantified the tidal current energy resources near communities in northern Canada, and assessed the feasibility of harnessing these renewable and predictable energy sources to offset diesel generation in northern communities. The research was divided in three stages: Assessment of energy needs in northern communities and available data for tidal modelling, numerical tide modelling, and, development of the Marine Energy Resources Atlas Canada (Arctic) application.\n\nFor more information, please refer to the technical reports.  {text=Stage 1,hyperlink=https://arctic.meracan.ca/assets/NRC-OCRE-2020-TR-013.pdf}  {text=Stage 2,hyperlink=https://arctic.meracan.ca/assets/NRC-OCRE-2020-TR-031.pdf}\n",
    termheader:"Term of Use",
    term:`The application is provided “AS IS”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the application or the use or other dealings in the application.`,
    contactheader:"Developer/Contact",
    contact:`Julien Cousineau, P.Eng., MASc.\nResearch Engineer\nOcean, Coastal and River Engineering\nNational Research Council Canada,  Government of Canada\n{Julien.Cousineau@nrc-cnrc.gc.ca}`,
    ackheader:"Acknowledgements",
    ack:`This application,Marine Energy Resources Atlas Canada (Arctic), and project “Inventory and Assessment of Tidal Energy Resources near Northern Communities” was supported by Polar Knowledge Canada.`
  },
  topheader:{
    lng:'Français',
    home:"Home",
    title:"Marine Energy Resource Atlas Canada (Arctic)",
    stitle:"MERACAN (Arctic)",
    about:"About",
    disclaimer:"Disclaimers",
    contact:"Contact",
  },
  legend:{
    references:"Reference(s)",
    title:"Legend",
    bathymetry:"Bathymetric Data (CHS)",
    model:"Model Data",
    report:"Report",
    chs:"CHS",
    datareference:"Data was computed using a numerical hydrodynamic model.For more information, please refer to the technical reports.",
    chsreference:"The Bathymetric Data  is from the Canadian Hydrographic Service (CHS) NONNA-10 and NONNA-100. The data represents a consolidation of digital bathymetric sources managed by the CHS.",
  },
  plot:{
    wl:"Tidal Height",
    wlt:"Tidal Height (Typical Neap/Spring Cycle)",
    speed:"Tidal Current",
    speed2:"Tidal Current Stats",
    wlu:"Height, m",
    speedt:"Tidal Current, m/s (Typical Neap/Spring Cycle)",
    speedu:"Speed, m/s",
    speeddu:"Tidal Current Direction, m/s",
    speedp:"Probability of Current Speed",
    speedpy:"Probability of Exceedance, %",
    speedpx:"Current Speed, m/s",
  },
  tooltip:{
    bug:"Report a bug",
    github:"Application repository",
    hidemodel:"Hide model data",
    showmodel:"Show model data",
    hidechs:"Hide bathymetric data",
    showchs:"Show bathymetric data",
  },

  
  
  
  
 
};
