// ✅ FIXED VERSION - Proper WebRTC Service with TURN/STUN

/**
 * WebRTC Service
 * Handles peer connection, signaling, and media streams
 * Includes TURN/STUN configuration, proper cleanup, and error handling
 */

class WebRTCService {
  constructor(socket) {
    this.socket = socket;
    this.peer = null;
    this.localStream = null;
    this.remoteStream = null;

    // Callbacks
    this.onRemoteStream = null;
    this.onConnectionStateChange = null;
    this.onError = null;
  }

  /**
   * ✅ FIX #1: TURN/STUN Configuration
   * Enables connectivity across firewalls and NAT
   */
  getRTCConfig() {
    return {
      iceServers: [
        // ✅ Public STUN servers (free)
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
        // ✅ TURN server (for firewall traversal) - configure your own
        {
          urls: process.env.REACT_APP_TURN_URL || "turn:turnserver.example.com:3478",
          username: process.env.REACT_APP_TURN_USER || "user",
          credential: process.env.REACT_APP_TURN_PASS || "pass",
        },
      ],
    };
  }

  /**
   * ✅ Initialize local media stream
   */
  async getLocalStream() {
    try {
      if (this.localStream) {
        return this.localStream;
      }

      // ✅ Request camera and microphone with proper error handling
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      return this.localStream;
    } catch (err) {
      const errorMsg = this.getMediaErrorMessage(err);
      this.handleError(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * ✅ Initiate a call (offer side)
   */
  async initiateCall(recipientId) {
    try {
      // Get local media
      await this.getLocalStream();

      // Create peer connection
      this.peer = new RTCPeerConnection(this.getRTCConfig());

      // Add local tracks
      this.localStream.getTracks().forEach((track) => {
        this.peer.addTrack(track, this.localStream);
      });

      // Handle remote stream
      this.peer.ontrack = (event) => {
        console.log("✅ Remote track received:", event.track.kind);
        this.remoteStream = event.streams[0];
        if (this.onRemoteStream) {
          this.onRemoteStream(event.streams[0]);
        }
      };

      // ✅ Handle connection state changes
      this.peer.onconnectionstatechange = () => {
        console.log(
          `📊 Connection state: ${this.peer.connectionState}`
        );

        if (this.onConnectionStateChange) {
          this.onConnectionStateChange(this.peer.connectionState);
        }

        // Auto-restart ICE on failure
        if (this.peer.connectionState === "failed") {
          console.log("⚠️  Connection failed, restarting ICE...");
          this.peer.restartIce();
        }

        // Handle disconnection
        if (this.peer.connectionState === "disconnected") {
          console.log("⚠️  Connection disconnected");
        }
      };

      // ✅ Handle ICE connection state
      this.peer.oniceconnectionstatechange = () => {
        console.log(
          `🧊 ICE connection state: ${this.peer.iceConnectionState}`
        );
      };

      // ✅ Handle ICE candidates
      this.peer.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit("ice-candidate", {
            to: recipientId,
            candidate: event.candidate,
          });
        } else {
          console.log("✅ ICE gathering complete");
        }
      };

      // ✅ Create and send offer
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);

      this.socket.emit("initiate-call", {
        to: recipientId,
        offer,
      });

      console.log("✅ Call initiated with offer");
    } catch (err) {
      console.error("Error initiating call:", err);
      this.handleError(err.message);
      throw err;
    }
  }

  /**
   * ✅ Answer a call (answer side)
   */
  async answerCall(offer, callerId) {
    try {
      // Get local media
      await this.getLocalStream();

      // Create peer connection
      this.peer = new RTCPeerConnection(this.getRTCConfig());

      // Add local tracks
      this.localStream.getTracks().forEach((track) => {
        this.peer.addTrack(track, this.localStream);
      });

      // Handle remote stream
      this.peer.ontrack = (event) => {
        console.log("✅ Remote track received:", event.track.kind);
        this.remoteStream = event.streams[0];
        if (this.onRemoteStream) {
          this.onRemoteStream(event.streams[0]);
        }
      };

      // Handle connection state
      this.peer.onconnectionstatechange = () => {
        console.log(
          `📊 Connection state: ${this.peer.connectionState}`
        );

        if (this.onConnectionStateChange) {
          this.onConnectionStateChange(this.peer.connectionState);
        }

        if (this.peer.connectionState === "failed") {
          console.log("⚠️  Connection failed, restarting ICE...");
          this.peer.restartIce();
        }
      };

      // Handle ICE candidates
      this.peer.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit("ice-candidate", {
            to: callerId,
            candidate: event.candidate,
          });
        } else {
          console.log("✅ ICE gathering complete");
        }
      };

      // Set remote description and create answer
      await this.peer.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);

      this.socket.emit("answer-call", {
        to: callerId,
        answer,
      });

      console.log("✅ Call answered");
    } catch (err) {
      console.error("Error answering call:", err);
      this.handleError(err.message);
      throw err;
    }
  }

  /**
   * ✅ Handle remote answer
   */
  async handleCallAnswered(answer) {
    try {
      if (!this.peer) {
        throw new Error("Peer connection not established");
      }

      await this.peer.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      console.log("✅ Remote answer set");
    } catch (err) {
      console.error("Error handling answer:", err);
      this.handleError(err.message);
      throw err;
    }
  }

  /**
   * ✅ Add ICE candidate
   */
  async addIceCandidate(candidate) {
    try {
      if (!this.peer || !candidate) {
        return;
      }

      await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.warn("Error adding ICE candidate:", err);
    }
  }

  /**
   * ✅ FIX #2: Proper cleanup of media streams
   * Stops all tracks and closes peer connection
   */
  cleanup() {
    try {
      // Stop all local tracks
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => {
          track.stop();
          console.log(`✅ Stopped ${track.kind} track`);
        });
        this.localStream = null;
      }

      // Stop all remote tracks
      if (this.remoteStream) {
        this.remoteStream.getTracks().forEach((track) => {
          track.stop();
        });
        this.remoteStream = null;
      }

      // Close peer connection
      if (this.peer) {
        this.peer.close();
        this.peer = null;
        console.log("✅ Peer connection closed");
      }

      // Clear callbacks
      this.onRemoteStream = null;
      this.onConnectionStateChange = null;
      this.onError = null;
    } catch (err) {
      console.error("Cleanup error:", err);
    }
  }

  /**
   * ✅ End call and notify peer
   */
  endCall(peerId) {
    try {
      this.cleanup();
      this.socket.emit("end-call", { to: peerId });
      console.log("✅ Call ended");
    } catch (err) {
      console.error("Error ending call:", err);
      this.handleError(err.message);
    }
  }

  /**
   * ✅ Reject incoming call
   */
  rejectCall(callerId, reason = "User declined") {
    this.cleanup();
    this.socket.emit("call-rejected", {
      to: callerId,
      reason,
    });
    console.log(`✅ Call rejected: ${reason}`);
  }

  /**
   * ✅ FIX #3: Handle connection state properly
   */
  getConnectionState() {
    return this.peer ? this.peer.connectionState : "closed";
  }

  /**
   * Get ICE connection state
   */
  getIceConnectionState() {
    return this.peer ? this.peer.iceConnectionState : "closed";
  }

  /**
   * ✅ Handle media errors gracefully
   */
  getMediaErrorMessage(err) {
    if (err.name === "NotAllowedError") {
      return "Camera/microphone permission denied. Please allow access in browser settings.";
    } else if (err.name === "NotFoundError") {
      return "Camera or microphone not found on this device.";
    } else if (err.name === "NotReadableError") {
      return "Camera or microphone is already in use by another application.";
    } else if (err.name === "SecurityError") {
      return "HTTPS is required for camera/microphone access.";
    }
    return `Media error: ${err.message}`;
  }

  /**
   * Handle errors
   */
  handleError(message) {
    console.error("❌ WebRTC Error:", message);
    if (this.onError) {
      this.onError(message);
    }
  }

  /**
   * Get local stream
   */
  getLocalStream() {
    return this.localStream;
  }

  /**
   * Get remote stream
   */
  getRemoteStream() {
    return this.remoteStream;
  }

  /**
   * Check if call is active
   */
  isCallActive() {
    return (
      this.peer &&
      (this.peer.connectionState === "connected" ||
        this.peer.connectionState === "connecting")
    );
  }
}

export default WebRTCService;
