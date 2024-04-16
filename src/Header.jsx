import React, { useEffect, useRef } from 'react';

const Map = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        // Initialize the map when the component mounts
        initMap();
    }, []);

    const initMap = () => {
        const center = { lat: 38.6348, lng: -90.2336 }; // Initial location
        const map = new window.google.maps.Map(mapRef.current, {
            zoom: 10, // Adjust zoom level as needed
            center: center,
        });

        // Add a marker for the initial location
        new window.google.maps.Marker({
            position: center,
            map: map,
            title: 'Saint Louis University as Initial Location',
        });

        // Check if Geolocation is available
        if (navigator.geolocation) {
            // Get current user's location
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const userLocation = { lat: latitude, lng: longitude };

                    // Center the map on the user's location
                    map.setCenter(userLocation);

                    // Add a marker at the user's location
                    new window.google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: 'Your Location',
                        icon: {
                          // url: {img},
                          url:'https://media4.giphy.com/media/33NDoxKd4RZivn8dp5/giphy.gif?cid=6c09b952f84ysj2qafm473tl0jv0c8rhwxwqhz9ho5kwmuta&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s',
                          scaledSize: new window.google.maps.Size(70, 70), // Adjust size as needed
                      },
                    });
                },
                error => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            
        }
       // mapRef.current.addEventListener('touchmove', 'handleTouchMove', { passive: true });
    };

    return <>
    <div>
    <div id='map' ref={mapRef} style={{ height: '90vh', width: '100%' }}></div></div>
    </> ;
};

export default Map;
