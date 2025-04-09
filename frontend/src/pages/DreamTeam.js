import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { teamsList } from "./teams";

// Components
import PositionSelect from "../components/PositionSelect";
import CardGrid from "../components/CardGrid";

// MUI Components
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Divider,
  Button,
  Fab,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  CircularProgress
} from "@mui/material";

// Icons
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import SearchIcon from "@mui/icons-material/Search";

// Hooks
import { useTypingEffect } from "../hooks/typing-effect";

// Images
import backgroundImage from "./feature3-bg.jpg";
import pitch from "./pitch.jpeg";

const DreamTeam = () => {
  // Refs
  const formRef = useRef(null);
  const resultRef = useRef(null);
  
  // Animation text
  const headerText = useTypingEffect("Build Your Dream Team", 100);
  
  // State variables
  const [ccflag, setCcflag] = useState(null); // Initialize with null (no selection)
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [tactic, setTactic] = useState("");
  const [customTactic, setCustomTactic] = useState("");
  const [players, setPlayers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Club and country options
  const clubs = teamsList.map((team) => ({ name: team }));
  const countryList = ['Argentina', 'Poland', 'Portugal', 'Brazil', 'Belgium', 'Slovenia', 'France', 'Germany', 'England', 'Korea Republic', 'Netherlands', 'Senegal', 'Egypt', 'Italy', 'Spain', 'Uruguay', 'Costa Rica', 'Norway', 'Croatia', 'Scotland', 'Algeria', 'Slovakia', 'Denmark', 'Switzerland', 'Hungary', 'Gabon', 'Serbia', 'Nigeria', 'Morocco', 'Sweden', 'Austria', 'Montenegro', "Côte d'Ivoire", 'Mexico', 'Bosnia and Herzegovina', 'Finland', 'Greece', 'Armenia', 'Colombia', 'Cameroon', 'Ghana', 'Wales', 'Russia', 'Turkey', 'United States', 'Jamaica', 'Canada', 'Czech Republic', 'Chile', 'Ukraine', 'Venezuela', 'Togo', 'Burkina Faso', 'Northern Ireland', 'Congo DR', 'Israel', 'Albania', 'Guinea', 'Iceland', 'China PR', 'New Zealand', 'Central African Republic', 'Peru', 'Mali', 'Japan', 'North Macedonia', 'Ecuador', 'Iran', 'Republic of Ireland', 'Angola', 'Romania', 'Mozambique', 'Cape Verde Islands', 'Australia', 'Paraguay', 'Tunisia', 'Kosovo', 'Zimbabwe', 'Zambia', 'Libya', 'Suriname', 'Saudi Arabia', 'Syria', 'Gambia', 'Kenya', 'Georgia', 'Equatorial Guinea', 'Panama', 'Dominican Republic', 'Trinidad and Tobago', 'Honduras', 'Guinea Bissau', 'Liberia', 'Curacao', 'Tanzania', 'Benin', 'Cyprus', 'South Africa', 'Uzbekistan', 'Congo', 'Madagascar', 'Moldova', 'Cuba', 'Saint Kitts and Nevis', 'Philippines', 'Fiji', 'United Arab Emirates', 'Luxembourg', 'Namibia', 'Chad', 'Lithuania', 'Bolivia', 'Comoros', 'Thailand', 'Bermuda', 'Burundi', 'Antigua and Barbuda', 'Malawi', 'Haiti', 'Bulgaria', 'Sierra Leone', 'Kazakhstan', 'Montserrat', 'Chinese Taipei', 'El Salvador', 'Niger', 'Malta', 'Uganda', 'Belarus', 'Jordan', 'India', 'Iraq', 'Puerto Rico', 'Azerbaijan', 'Mauritania', 'Eritrea', 'Mauritius', 'Lebanon', 'Sudan', 'Grenada', 'Latvia', 'Guam', 'Kyrgyzstan', 'Guyana', 'Faroe Islands', 'Papua New Guinea', 'Ethiopia', 'Andorra', 'Korea DPR', 'Saint Lucia', 'Afghanistan', 'Vietnam', 'Belize', 'Guatemala', 'Palestine', 'Bhutan', 'Barbados', 'Gibraltar', 'Malaysia', 'Estonia', 'South Sudan', 'Hong Kong', 'Indonesia'];
  const countries = countryList.map((country) => ({ name: country }));

  // Handlers
  const handleRadioChange = (event) => {
    const value = event.target.value;
    if (value === "Club") {
      setCcflag(0);
      setTeams(clubs);
    } else {
      setCcflag(1);
      setTeams(countries);
    }
  };

  const handleTeamSelection = (event, value) => {
    setSelectedTeam(value);
  };

  const handleTacticChange = (event) => {
    setTactic(event.target.value);
  };

  const handleCustomTacticChange = (event) => {
    setCustomTactic(event.target.value);
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePositionsChange = (values) => {
    setPositions(values);
  };

  // API calls
  const fetchPlayers = async (params) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    setIsLoading(true);
    setDataLoaded(false);
    
    // Scroll to results section
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    try {
      const response = await axios.post(`${backendUrl}/feature3`, null, { params });
      setPlayers(response.data.result);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedSearch = async () => {
    if (!selectedTeam || !tactic) return;
    
    const params = {
      tactic,
      [ccflag === 0 ? "club" : "country"]: selectedTeam
    };
    
    await fetchPlayers(params);
  };

  const handleCustomSearch = async () => {
    if (!selectedTeam || !positions.length) return;
    
    const params = {
      tactic: customTactic,
      [ccflag === 0 ? "club" : "country"]: selectedTeam,
      position: positions
    };
    
    await fetchPlayers(params);
  };

  // Format tactic for display
  const formatTacticArray = () => {
    if (!tactic && !customTactic) return [1];
    const selectedTactic = tactic || customTactic;
    return [1, ...Array.from(selectedTactic, char => parseInt(char, 10))];
  };

  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{
          position: "relative",
          width: "100%",
          height: "90vh",
          overflow: "hidden"
        }}
      >
        <Box
          component="img"
          src={backgroundImage}
          alt="Football stadium"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: "bold",
              mb: 4,
              textAlign: "center"
            }}
          >
            {headerText}
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{ 
              fontSize: { xs: "1rem", md: "1.2rem" },
              mb: 6,
              maxWidth: "800px",
              textAlign: "center",
              px: 2
            }}
          >
            Create your ultimate football squad by selecting players from your favorite clubs or countries,
            and arrange them in your preferred tactical formation.
          </Typography>
          
          <Fab 
            color="primary" 
            onClick={handleScrollToForm}
            sx={{ 
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" }
            }}
          >
            <KeyboardDoubleArrowDownIcon />
          </Fab>
        </Box>
      </Box>

      {/* Form Section */}
      <Box 
        ref={formRef} 
        sx={{
          backgroundColor: "#0a1929",
          py: 6,
          px: {xs: 2, md: 4}
        }}
      >
        <Container maxWidth="lg">
          <Paper 
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              backgroundColor: "#132f4c"
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                color: "white", 
                mb: 4,
                textAlign: "center"
              }}
            >
              Team Selection
            </Typography>

            <Grid container spacing={4}>
              {/* Left Column - Team Selection */}
              <Grid item xs={12} md={5}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#90caf9", mb: 2 }}>
                    Select Team Type
                  </Typography>
                  
                  <RadioGroup
                    row
                    onChange={handleRadioChange}
                    sx={{ mb: 2 }}
                  >
                    <FormControlLabel 
                      value="Club" 
                      control={
                        <Radio 
                          sx={{ 
                            color: "#90caf9",
                            '&.Mui-checked': { color: "#90caf9" }
                          }} 
                        />
                      } 
                      label="Club" 
                      sx={{ color: "white" }}
                    />
                    <FormControlLabel 
                      value="Country" 
                      control={
                        <Radio 
                          sx={{ 
                            color: "#90caf9",
                            '&.Mui-checked': { color: "#90caf9" }
                          }} 
                        />
                      } 
                      label="Country" 
                      sx={{ color: "white" }}
                    />
                  </RadioGroup>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ color: "white", mb: 1 }}>
                    {ccflag === 0 ? "Select Club" : ccflag === 1 ? "Select Country" : "Select Team"}
                  </Typography>
                  
                  <Autocomplete
                    options={teams.map(team => team.name) || []}
                    onChange={handleTeamSelection}
                    disabled={ccflag === null}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        placeholder={ccflag === 0 ? "Choose club" : ccflag === 1 ? "Choose country" : "Select team type first"}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#1e4976",
                            color: "white",
                            "& fieldset": { borderColor: "#2d6ab1" },
                            "&:hover fieldset": { borderColor: "#90caf9" },
                            "&.Mui-focused fieldset": { borderColor: "#90caf9" }
                          },
                          "& .MuiInputLabel-root": { color: "#90caf9" }
                        }}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ color: "white", mb: 1 }}>
                    Select Formation
                  </Typography>
                  
                  <FormControl fullWidth>
                    <Select
                      value={tactic}
                      onChange={handleTacticChange}
                      displayEmpty
                      sx={{
                        backgroundColor: "#1e4976",
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2d6ab1" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#90caf9" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#90caf9" }
                      }}
                    >
                      <MenuItem value="">
                        <em>Select a formation</em>
                      </MenuItem>
                      <MenuItem value="433">4-3-3</MenuItem>
                      <MenuItem value="442">4-4-2</MenuItem>
                      <MenuItem value="352">3-5-2</MenuItem>
                      <MenuItem value="343">3-4-3</MenuItem>
                      <MenuItem value="4231">4-2-3-1</MenuItem>
                      <MenuItem value="532">5-3-2</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={handlePredefinedSearch}
                  disabled={!selectedTeam || !tactic || ccflag === null}
                  fullWidth
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                    py: 1.5
                  }}
                >
                  Find Dream Team
                </Button>
              </Grid>

              {/* Divider */}
              <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
                  <Divider orientation="vertical" sx={{ 
                    height: { xs: "2px", md: "80%" }, 
                    width: { xs: "100%", md: "2px" },
                    backgroundColor: "#2d6ab1" 
                  }} />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: "white", 
                      mx: 2,
                      position: "absolute",
                      backgroundColor: "#132f4c",
                      px: 2
                    }}
                  >
                    OR
                  </Typography>
                </Box>
              </Grid>

              {/* Right Column - Custom Selection */}
              <Grid item xs={12} md={5}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#90caf9", mb: 2 }}>
                    Custom Formation
                  </Typography>
                  
                  <TextField
                    label="Custom Formation"
                    type="number"
                    value={customTactic}
                    onChange={handleCustomTacticChange}
                    placeholder="e.g. 4321"
                    fullWidth
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#1e4976",
                        color: "white",
                        "& fieldset": { borderColor: "#2d6ab1" },
                        "&:hover fieldset": { borderColor: "#90caf9" },
                        "&.Mui-focused fieldset": { borderColor: "#90caf9" }
                      },
                      "& .MuiInputLabel-root": { color: "#90caf9" }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ color: "white", mb: 1 }}>
                    Select Positions
                  </Typography>
                  
                  <PositionSelect onSelectValuesChange={handlePositionsChange} />
                </Box>

                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={handleCustomSearch}
                  disabled={!selectedTeam || !positions.length || ccflag === null}
                  fullWidth
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                    py: 1.5,
                    mt: 4
                  }}
                >
                  Find Custom Team
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Results Section */}
      <Box 
        ref={resultRef}
        sx={{
          backgroundColor: "#0a1929",
          py: 6,
          px: {xs: 2, md: 4}
        }}
      >
        <Container maxWidth="xl">
          <Paper 
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              backgroundColor: "#132f4c",
              position: "relative",
              minHeight: "800px",
              overflow: "hidden"
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                color: "white", 
                mb: 4,
                textAlign: "center"
              }}
            >
              Your Dream Team
            </Typography>
            
            <Box 
              sx={{
                position: "relative",
                width: "100%",
                height: "calc(100% - 60px)",
                minHeight: "700px",
                borderRadius: 1,
                overflow: "hidden",
                border: "2px solid rgba(45, 106, 177, 0.5)"
              }}
            >
              {/* Only show pitch background when data is loaded */}
              {dataLoaded && (
                <Box
                  component="img"
                  src={pitch}
                  alt="Football pitch"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    animation: "fadeIn 1s ease-in-out",
                    "@keyframes fadeIn": {
                      "0%": {
                        opacity: 0,
                      },
                      "100%": {
                        opacity: 1,
                      },
                    },
                  }}
                />
              )}
              
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: dataLoaded ? "transparent" : "rgba(0, 0, 0, 0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {isLoading ? (
                  <Box sx={{ textAlign: "center" }}>
                    <CircularProgress size={60} sx={{ color: "#90caf9", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "white" }}>
                      Building your dream team...
                    </Typography>
                  </Box>
                ) : dataLoaded ? (
                  <CardGrid 
                    tactic={formatTacticArray()} 
                    data={players} 
                    sx={{
                      animation: "slideInFromTop 1s ease-out",
                      "@keyframes slideInFromTop": {
                        "0%": {
                          transform: "translateY(-20px)",
                          opacity: 0,
                        },
                        "100%": {
                          transform: "translateY(0)",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ color: "white", textAlign: "center", px: 2 }}>
                    Select a team type, team, and formation, then click "Find Dream Team" to see your results
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default DreamTeam;