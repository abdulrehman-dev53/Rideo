module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // Driver live location stream
    socket.on("updateDriverLocation", (data) => {
      // data: { driverId, lat, lng }
      socket.broadcast.emit("driverLocationUpdated", data);
    });

    // Join ride room for scoped events
    socket.on("joinRideRoom", ({ rideId }) => {
      if (rideId) socket.join(`ride_${rideId}`);
    });

    // Scoped driver updates (room-based)
    socket.on("updateDriverLocationForRide", ({ rideId, lat, lng, driverId }) => {
      if (!rideId) return;
      io.to(`ride_${rideId}`).emit("driverLocationUpdatedForRide", { driverId, lat, lng });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
};
