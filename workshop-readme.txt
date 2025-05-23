Outside of my day job, I’m working with some friends on an application that, through antennas and a set of sensors, monitors the hatching of sea-turtle eggs and stores the related data in a relational database via REST APIs.
I’d like to write a smart contract that can mint and update an NFT representing each egg, its hatching, and its life-cycle.


The contract keeps, in boxes, a list of creators (addresses allowed to mint NFTs) and a list of updaters (addresses allowed to modify them).
There are 'creator' boxes, 'updater' boxes and 'eggs' boxes.
The goal is that, in the future, the backend—or even the antennas themselves through REST calls—can create or update NFTs autonomously (i.e., antennas acting as creators and/or updaters).

Each NFT gets its own box containing a data blob with information such as latitude, longitude, timestamp of the record, etc. I see the data blob as a string like "latitude=xxx;altitude=yyy; ...."
The box always stores the latest data blob, while past states can be reconstructed from transaction logs.

A React frontend (Next JS + Redux) will display these details and other relevant data.

If the connected user is a creator, the UI must show the NFT-creation form.

If the user is an updater, it must show the interface for editing an existing NFT.

The initial goal is to have an app that, depending on the user’s role, lets us manage and view the NFTs, their specific data, statistics, and geolocation.

Unfortunately, this week I couldn’t progress much due to work commitments.
So far I’ve built an interface that lets the deployer add “creator” addresses and list them, and I can mint an NFT with latitude, longitude, altitude, and registration date, save its box and then display it in a table.
I’m not sure whether the architecture is correct or if I’m on the right track.

Everything is still very early-stage; the code needs proper organization. I have to finish testing all basic use-cases and wire up the various pages and sections of the frontend.
I also need to decide how to handle metadata on IPFS (e.g., via Pinata or similar) so I can attach it when minting the NFT.


The course has been extremely interesting; I also attended the previous edition (remotely, because of work-schedule conflicts). I m a computer engineer, actually working as a fullstack dev, my desire is to become proficient and work in this field, which has fascinated me for a long time.
Thank you, and sorry that my progress is still rather limited!

— Michele

in order to start frontend:
npm i

set in env.local proper variables, remember to set NEXT_PUBLIC_TURTLE_APPID

npm run devnext