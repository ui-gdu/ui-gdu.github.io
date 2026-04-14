import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import jamGames from './JamGames';
import JamDetails from './JamDetails';

// Clean modern light theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#f1b300' },
    secondary: { main: '#d81b60' },
    background: { default: '#f8f9fa', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' } },
    },
  },
});

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};

const pastGames = shuffle(jamGames);

const backgroundImages = pastGames.map(v => v.image).filter(v => !v.endsWith('default.png'));

// const backgroundImages = [
//   'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=85',
//   'https://images.unsplash.com/photo-1551103782-8b07cd6c6b39?w=1920&q=85',
//   'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=85',
//   'https://images.unsplash.com/photo-1511512578047-dfb36784e144?w=1920&q=85',
// ];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        pt: '64px',
      }}
    >
      {backgroundImages.map((src, i) => (
        <Box
          key={src}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === currentImageIndex ? 1 : 0,
            transition: 'opacity 1.8s ease-in-out',
            filter: "blur(6px)" // Adds blur to the main background
          }}
        />
      ))}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '900px', px: 4 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3.2rem', md: '5.5rem' },
            mb: 2,
          }}
        >
          University of Idaho <br/>
          Game Jam
        </Typography>
        <Typography variant="h4" sx={{ mb: 5, opacity: 0.9 }}>
          Develop Games Together
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="https://discord.gg/CkZUPYgTxE"
          target="_blank"
          sx={{ px: 6, py: 1.8, fontSize: '1.25rem' }}
        >
          Join Discord
        </Button>
      </Box>
    </Box>
  );
};

const WhatIsGameJamSection: React.FC = () => (
  <Box id="what-is" sx={{ py: 10, px: { xs: 3, md: 8 }, textAlign: 'center' }}>
    <Typography variant="h2" gutterBottom>
      What is a Game Jam?
    </Typography>
    <Typography variant="body1" sx={{ maxWidth: 780, mx: 'auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
      A game jam is an accelerated game development event where participants <b>create a game from scratch</b> over the course of a weekend. <br/><br/>
      There will be an accompanying theme revealed at the opening ceremony.
      The winners are declared and <b>prizes</b> are dispersed at the closing ceremony where everyone plays the games and votes.
      <b> Food and beverages provided.</b><br/><br/>
      Whether you are a musician, 2D/3D artist, programmer, gamer, expert, or beginner, you are welcomed and invited to <a href="https://discord.gg/CkZUPYgTxE" target="_blank">join</a>!
    </Typography>
  </Box>
);

const WhenWhereSection: React.FC = () => (
  <Box id="when-where" sx={{ py: 10, px: { xs: 3, md: 8 }, textAlign: 'center' }}>
    <Typography variant="h2" gutterBottom>
      Event Details
    </Typography>

    <Typography variant="h3" gutterBottom>{JamDetails.name}</Typography>
    <Typography variant="h4" gutterBottom>Opening Ceremony</Typography>
    <Typography variant="body1" sx={{ maxWidth: 780, mx: 'auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
      Location: {JamDetails.location} <br/>
      Date: {JamDetails.openingDate} <br/>
      Time: {JamDetails.openingTime} <br/>
    </Typography>
    <Typography variant="h4" gutterBottom>Closing Ceremony</Typography>
    <Typography variant="body1" sx={{ maxWidth: 780, mx: 'auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
      Location: {JamDetails.location} <br/>
      Date: {JamDetails.closingDate} <br/>
      Time: {JamDetails.closingTime} <br/>
    </Typography>
  </Box>
);

const PastGamesSection: React.FC = () => (
  <Box id="past-games" sx={{ py: 10, px: { xs: 3, md: 8 }, bgcolor: 'background.default' }}>
    <Typography variant="h2" align="center" gutterBottom>
      Games from Previous Jams
    </Typography>
//     <Button
//variant="contained"
  //color="primary"
  //size="large"
  //href="https://uidaho-gdu.itch.io/"
  //target="_blank"
  //sx={{ 
  //  px: 6, 
  //  py: 1.8, 
  //  fontSize: '1.25rem',
  //  display: 'block', // Necessary for margin auto to work
  //  mx: 'auto',      // Centers horizontally
  //  width: 'fit-content' 
  //}}
   // >
    //  View All the Games on GDU's Itch Page!
    //</Button>
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 5 }}>
      {pastGames.map((game, i) => (
        <Grid key={i}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea 
              href={game.link} 
              target="_blank" 
              sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ position: 'relative', width: '100%', flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  image={game.image}
                  alt={game.title}
                  sx={{ 
                    height: 260, 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.65)',
                    color: 'white',
                    py: 1.5,
                    px: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" noWrap>
                    {game.title}
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

// Scalable testimonials — add as many as you want!
const testimonials = [
  {
    name: 'Michael C',
    quote: 'This club is a perfect place to make friends and games. ' +
      'Once, I would speak with ducks for ideas. Now, I speak with humans. ' +
      'Club has improved my social life.',
  },
  {
    name: 'Jake',
    quote: 'Stayed up till 2 AM desparately trying to get my game together as it was doing everything in its power to break. 10/10',
  },
  {
    name: 'Rowan D',
    quote: 'The club is so awesome! I don\'t even go to the school, and I still do the game jams there.',
  },
  {
    name: 'Adam',
    quote: 'Too much scope creep, not enough Red Bull and Boo Berry. Still worth it.',
  },
  {
    name: 'Ben R',
    quote: 'I\'ve made some fantastic memories, video games, and friends through my participation in this club! I strongly recommend the game jams to anyone who wants to make video games.',
  },
  {
    name: 'Devon B',
    quote: 'Many passionate people keep this club afloat. If you\'re passionate about games (even just playing them), why not stop by and say hi?',
  },
  {
    name: 'Sans',
    quote: 'human, I remember you\'re game jams',
  },
  // {
  //   name: 'Qwertyay',
  //   quote: 'Oops! All Spaghetti!',
  // },
  // {
  //   name: 'Trashmage',
  //   quote: 'uh',
  // },



  {
    name: 'Michael C',
    quote: 'This club is a perfect place to make friends and games. ' +
      'Once, I would speak with ducks for ideas. Now, I speak with humans. ' +
      'Club has improved my social life.',
  },
  {
    name: 'Jake',
    quote: 'Stayed up till 2 AM desparately trying to get my game together as it was doing everything in its power to break. 10/10',
  },
  {
    name: 'Rowan D',
    quote: 'The club is so awesome! I don\'t even go to the school, and I still do the game jams there.',
  },
  {
    name: 'Adam',
    quote: 'Too much scope creep, not enough Red Bull and Boo Berry. Still worth it.',
  },
    {
    name: 'Ben R',
    quote: 'I\'ve made some fantastic memories, video games, and friends through my participation in this club! I strongly recommend the game jams to anyone who wants to make video games.',
  },
  {
    name: 'Devon B',
    quote: 'Many passionate people keep this club afloat. If you\'re passionate about games (even just playing them), why not stop by and say hi?',
  },
  {
    name: 'Sans',
    quote: 'human, I remember you\'re game jams',
  },
];

const TestimonialsSection = () => {
  const animation = { duration: 10 * 1000 * testimonials.length, easing: (t: number) => t }
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: { perView: "auto", spacing: 50 },
    created(s) {
      s.moveToIdx(testimonials.length, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + testimonials.length, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + testimonials.length, true, animation)
    },
  });

  return (
  <div id="testimonials">
      <Typography variant="h2" align="center" gutterBottom>
        Testimonials
      </Typography>
        <div ref={sliderRef} className="keen-slider" style={{position: 'absolute', overflow: 'hidden', width: '100%'}}>
          {testimonials.map((t, i) => (
            <div key={i} className="keen-slider__slide" style={{ minWidth: 200, maxWidth: 200 }}>
                <div className="bg-white p-6 rounded-xl shadow-lg h-full">
                  <p className="italic mb-4">“{t.quote}”</p>
                  <p className="font-bold">{t.name}</p>
                </div>
            </div>
          ))}
        </div>
        <div style={{minHeight: 200}} />
    </div>
  )
}

const mediaImages = [
  '/events/so2025.jpg',
  '/events/fo2025_jam3.jpg',
  '/events/fc2025_jam3.jpg',
  '/events/fo2025_jam4.jpg',
  '/events/jam.jpg',
  '/events/s2025.jpg',
  '/events/team_at_breakfast_jam4.jpg',
  '/events/team_breakfast.webp',
  '/events/winner_pizza.png',

  // Jam5 Fall 2026
  '/events/jam5_fc2026/baking_club_cookies.jpg',
  '/events/jam5_fc2026/baking_club.jpg',
  '/events/jam5_fc2026/overall_winner.jpg',
  '/events/jam5_fc2026/pan.jpg',
  '/events/jam5_fc2026/prizes_d.jpg',
  '/events/jam5_fc2026/prizes_j.jpg',
  '/events/jam5_fc2026/winner1.jpg',
  '/events/jam5_fc2026/winner2.jpg',
  '/events/jam5_fc2026/winner3.jpg',
];

const MediaSection: React.FC = () => (
  <Box id="media" sx={{ py: 10, px: { xs: 3, md: 8 }, bgcolor: 'background.default' }}>
    <Typography variant="h2" align="center" gutterBottom>
      Moments from Past Events
    </Typography>
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 5 }}>
      {mediaImages.map((src, i) => (
        <Grid key={i}>
          <Card elevation={4}>
            <CardMedia
              component="img"
              height="260"
              image={src}
              alt={`Event photo ${i + 1}`}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

// const JointClubsSection: React.FC = () => (
//   <Box sx={{ py: 10, px: { xs: 3, md: 8 } }}>
//     <Typography variant="h2" align="center" gutterBottom>
//       Joint Clubs
//     </Typography>

//     {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, flexWrap: 'wrap', gap: 10 }}>
//       <Box sx={{ textAlign: 'center' }}>
//         <Box
//           component="img"
//           src="/sponsors/lightcast.jpg"
//           alt="Lightcast"
//           sx={{ height: 256, mb: 2 }}
//         />
//       </Box>
//     </Box> */}

//     <Typography
//       variant="body1"
//       align="center"
//       sx={{ mt: 8, maxWidth: 760, mx: 'auto', fontSize: '1.15rem' }}
//     >
//       TODO
//     </Typography>
//   </Box>
// );

const SponsorsSection: React.FC = () => (
  <Box id="sponsors" sx={{ py: 10, px: { xs: 3, md: 8 } }}>
    <Typography variant="h2" align="center" gutterBottom>
      Our Wonderful Sponsors
    </Typography>

    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, flexWrap: 'wrap', gap: 10 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          component="img"
          src='/sponsors/lightcast.jpg'
          alt="Lightcast"
          sx={{
            height: 256,
            width: 'auto',
            maxWidth: '100%',
            mb: 2,
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>

    

    <Typography
      variant="body1"
      align="center"
      sx={{ mt: 8, maxWidth: 760, mx: 'auto', fontSize: '1.15rem' }}
    >
      <Typography variant="h6" align='justify' fontStyle='italic'>
        "It has been Lightcast's honor to support Game Developers United over the past year,
        and for years to come. Seeing the passion of these engineers and the innovation that
        goes into the games they create gives us inspiration to continue pushing new
        boundaries and highlights the capabilities of the next generation of software engineers."
      </Typography>

      <br/>
      <Typography variant="h6">
        - Lightcast Team
      </Typography>

      <br/>
      <br/>
      <br/>
      A heartfelt thank you to Lightcast. 
      Your support makes these creative weekends possible and helps grow the game developer community.
    </Typography>
  </Box>
);

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src="/gdc_logo.png" alt="Logo" sx={{ height: 64, mr: 1 }} />
            <Typography variant="h6">Game Devs United</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" onClick={() => scrollTo('what-is')}>About</Button>
            <Button color="inherit" onClick={() => scrollTo('when-where')}>Details</Button>
            <Button color="inherit" onClick={() => scrollTo('past-games')}>Games</Button>
            <Button color="inherit" onClick={() => scrollTo('testimonials')}>Testimonials</Button>
            <Button color="inherit" onClick={() => scrollTo('media')}>Gallery</Button>
            <Button color="inherit" onClick={() => scrollTo('sponsors')}>Sponsors</Button>
            <Button variant="contained" size="small" href="https://discord.gg/CkZUPYgTxE" target="_blank">
              Join Discord
            </Button>
          </Box>

          <IconButton 
            sx={{ display: { xs: 'block', md: 'none' } }} 
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 220, pt: 2 }}>
          <ListItemButton onClick={() => scrollTo('what-is')}>
            <ListItemText primary="About" />
          </ListItemButton>
          <ListItemButton onClick={() => scrollTo('when-where')}>
            <ListItemText primary="Details" />
          </ListItemButton>
          <ListItemButton onClick={() => scrollTo('past-games')}>
            <ListItemText primary="Games" />
          </ListItemButton>
          <ListItemButton onClick={() => scrollTo('testimonials')}>
            <ListItemText primary="Testimonials" />
          </ListItemButton>
          <ListItemButton onClick={() => scrollTo('media')}>
            <ListItemText primary="Gallery" />
          </ListItemButton>
          <ListItemButton onClick={() => scrollTo('sponsors')}>
            <ListItemText primary="Sponsors" />
          </ListItemButton>
          <ListItem sx={{ px: 2, mt: 1 }}>
            <Button fullWidth variant="contained" href="https://discord.gg/CkZUPYgTxE" target="_blank">
              Join Discord
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

// ──────────────────────────────────────────────
const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <NavBar />
      <HeroSection />
      <WhatIsGameJamSection />
      <WhenWhereSection />
      <PastGamesSection />
      <TestimonialsSection />
      <MediaSection />
      {/* <JointClubsSection /> */}
      <SponsorsSection />
    </Box>
  </ThemeProvider>
);

export default App;
