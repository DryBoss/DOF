import React, { useState } from "react";

// --- 1. Particle on a Circle (1 DOF) ---
function CircleDOF() {
  const [theta, setTheta] = useState(45);
  const center = 150,
    radius = 100;
  const rad = (theta * Math.PI) / 180;
  const x = center + radius * Math.cos(rad);
  const y = center - radius * Math.sin(rad);
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>1 DOF: Circular Constraint</h3>
      <p style={{ fontSize: "14px", color: "#4b5563" }}>
        Constraint: x² + y² = a²
      </p>
      <input
        type="range"
        min="0"
        max="360"
        value={theta}
        onChange={(e) => setTheta(e.target.value)}
        style={{ width: "100%", maxWidth: "300px" }}
      />
      <p style={{ fontSize: "14px", fontWeight: "bold" }}>
        Angle (θ): {theta}°
      </p>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 300 300"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#9ca3af"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4"
        />
        <circle cx={x} cy={y} r="8" fill="#3b82f6" />
        <line
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke="#3b82f6"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

// --- 2. Five Free Particles (10 DOF) ---
function FiveFreeParticles() {
  const [particles, setParticles] = useState([
    { id: 1, x: 50, y: 50, color: "#ef4444" },
    { id: 2, x: 250, y: 80, color: "#3b82f6" },
    { id: 3, x: 150, y: 150, color: "#10b981" },
    { id: 4, x: 220, y: 240, color: "#f59e0b" },
    { id: 5, x: 80, y: 220, color: "#8b5cf6" },
  ]);
  const update = (id, axis, val) =>
    setParticles(
      particles.map((p) => (p.id === id ? { ...p, [axis]: Number(val) } : p)),
    );
  return (
    <div className="simulation-wrapper">
      <div>
        <h3 style={{ marginTop: 0 }}>10 DOF: Free Particles</h3>
        <p style={{ fontSize: "14px", color: "#4b5563", maxWidth: "300px" }}>
          No constraints. 5 particles × 2 coordinates = 10 inputs.
        </p>
        <svg
          width="100%"
          height="300"
          viewBox="0 0 300 300"
          style={{
            background: "#f9fafb",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "300px",
          }}
        >
          {particles.map((p) => (
            <circle key={p.id} cx={p.x} cy={p.y} r="10" fill={p.color} />
          ))}
        </svg>
      </div>
      <div
        style={{
          flex: 1,
          minWidth: "200px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f3f4f6",
              borderRadius: "6px",
              borderLeft: `4px solid ${p.color}`,
            }}
          >
            <b style={{ fontSize: "14px" }}>Particle {p.id}</b>
            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <input
                type="range"
                min="10"
                max="290"
                value={p.x}
                onChange={(e) => update(p.id, "x", e.target.value)}
                style={{ width: "100%" }}
              />
              <input
                type="range"
                min="10"
                max="290"
                value={p.y}
                onChange={(e) => update(p.id, "y", e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 3. Rigid Rod in a Plane (3 DOF) ---
function RigidRod2D() {
  const [x1, setX1] = useState(150),
    [y1, setY1] = useState(150),
    [angle, setAngle] = useState(45);
  const length = 100;
  const rad = (angle * Math.PI) / 180;
  const x2 = x1 + length * Math.cos(rad),
    y2 = y1 - length * Math.sin(rad);
  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>3 DOF: Rigid Rod</h3>
        <p style={{ fontSize: "14px", color: "#4b5563" }}>
          Constraint: (x₂ - x₁)² + (y₂ - y₁)² = l²
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            X1:{" "}
            <input
              type="range"
              min="50"
              max="250"
              value={x1}
              onChange={(e) => setX1(Number(e.target.value))}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Y1:{" "}
            <input
              type="range"
              min="50"
              max="250"
              value={y1}
              onChange={(e) => setY1(Number(e.target.value))}
            />
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Angle:{" "}
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 300 300"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#4b5563"
          strokeWidth="4"
        />
        <circle cx={x1} cy={y1} r="10" fill="#3b82f6" />
        <circle cx={x2} cy={y2} r="10" fill="#ef4444" />
      </svg>
    </div>
  );
}

// --- 4. Rigid Body in 3D (CSS) (6 DOF) ---
function RigidBodyCSS() {
  const [x, setX] = useState(0),
    [y, setY] = useState(0),
    [z, setZ] = useState(0);
  const [rx, setRx] = useState(0),
    [ry, setRy] = useState(0),
    [rz, setRz] = useState(0);
  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>6 DOF: Rigid Body (CSS)</h3>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#eff6ff",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          <b style={{ fontSize: "14px" }}>Translation</b>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "5px",
            }}
          >
            <input
              type="range"
              min="-100"
              max="100"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
            <input
              type="range"
              min="-100"
              max="100"
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
            <input
              type="range"
              min="-100"
              max="100"
              value={z}
              onChange={(e) => setZ(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fef2f2",
            borderRadius: "6px",
          }}
        >
          <b style={{ fontSize: "14px" }}>Rotation</b>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "5px",
            }}
          >
            <input
              type="range"
              min="0"
              max="360"
              value={rx}
              onChange={(e) => setRx(e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="360"
              value={ry}
              onChange={(e) => setRy(e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="360"
              value={rz}
              onChange={(e) => setRz(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "300px",
          perspective: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#3b82f6",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
          }}
        >
          Rigid Body
        </div>
      </div>
    </div>
  );
}

// --- 5. Rigid Body in 3D (SVG Wireframe) (6 DOF) ---
function RigidBodySVG() {
  const [tx, setTx] = useState(0),
    [ty, setTy] = useState(0),
    [tz, setTz] = useState(0);
  const [pitch, setPitch] = useState(15),
    [yaw, setYaw] = useState(-30),
    [roll, setRoll] = useState(10);
  const orig = [
    { id: "P1", x: -40, y: -30, z: -20 },
    { id: "P2", x: 40, y: -30, z: -20 },
    { id: "P3", x: 0, y: 40, z: -20 },
    { id: "P4", x: 0, y: 0, z: 40 },
  ];

  const projected = orig.map((p) => {
    const rP = (pitch * Math.PI) / 180,
      rY = (yaw * Math.PI) / 180,
      rR = (roll * Math.PI) / 180;
    let x1 = p.x,
      y1 = p.y * Math.cos(rP) - p.z * Math.sin(rP),
      z1 = p.y * Math.sin(rP) + p.z * Math.cos(rP);
    let x2 = x1 * Math.cos(rY) + z1 * Math.sin(rY),
      y2 = y1,
      z2 = -x1 * Math.sin(rY) + z1 * Math.cos(rY);
    let xRot = x2 * Math.cos(rR) - y2 * Math.sin(rR),
      yRot = x2 * Math.sin(rR) + y2 * Math.cos(rR),
      zRot = z2;
    const finalZ = zRot + tz,
      scale = 250 / (250 - finalZ);
    return {
      id: p.id,
      cx: 150 + (xRot + tx) * scale,
      cy: 150 - (yRot + ty) * scale,
      scale,
      z: finalZ,
    };
  });

  const getLine = (i, j, dash) => {
    const pA = projected.find((p) => p.id === i),
      pB = projected.find((p) => p.id === j);
    return (
      <line
        x1={pA.cx}
        y1={pA.cy}
        x2={pB.cx}
        y2={pB.cy}
        stroke="#4b5563"
        strokeWidth={dash ? 1.5 : 3.5}
        strokeDasharray={dash ? "3,3" : "0"}
      />
    );
  };

  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>6 DOF: 3D Math Wireframe</h3>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f0fdf4",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          <b style={{ fontSize: "13px" }}>Translational (X,Y,Z)</b>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "5px",
            }}
          >
            <input
              type="range"
              min="-50"
              max="50"
              value={tx}
              onChange={(e) => setTx(Number(e.target.value))}
            />
            <input
              type="range"
              min="-50"
              max="50"
              value={ty}
              onChange={(e) => setTy(Number(e.target.value))}
            />
            <input
              type="range"
              min="-50"
              max="50"
              value={tz}
              onChange={(e) => setTz(Number(e.target.value))}
            />
          </div>
        </div>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff7ed",
            borderRadius: "6px",
          }}
        >
          <b style={{ fontSize: "13px" }}>Rotational (Pitch, Yaw, Roll)</b>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "5px",
            }}
          >
            <input
              type="range"
              min="-180"
              max="180"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
            />
            <input
              type="range"
              min="-180"
              max="180"
              value={yaw}
              onChange={(e) => setYaw(Number(e.target.value))}
            />
            <input
              type="range"
              min="-180"
              max="180"
              value={roll}
              onChange={(e) => setRoll(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 300 300"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        {getLine("P1", "P2")} {getLine("P2", "P3")} {getLine("P3", "P1")}
        {getLine("P1", "P4", true)} {getLine("P2", "P4", true)}{" "}
        {getLine("P3", "P4", true)}
        {projected.map((p) => (
          <circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={6 * p.scale}
            fill="#3b82f6"
          />
        ))}
      </svg>
    </div>
  );
}

// --- 6. Fixed Point Rigid Body (3 DOF) ---
function FixedPoint3D() {
  const [pitch, setPitch] = useState(25),
    [yaw, setYaw] = useState(-45),
    [roll, setRoll] = useState(10);
  const orig = [
    { id: "P1", x: 0, y: 0, z: 0, color: "#ef4444" },
    { id: "P2", x: 60, y: -40, z: -20, color: "#10b981" },
    { id: "P3", x: -20, y: 50, z: 30, color: "#a855f7" },
  ];

  const projected = orig.map((p) => {
    const rP = (pitch * Math.PI) / 180,
      rY = (yaw * Math.PI) / 180,
      rR = (roll * Math.PI) / 180;
    let x1 = p.x,
      y1 = p.y * Math.cos(rP) - p.z * Math.sin(rP),
      z1 = p.y * Math.sin(rP) + p.z * Math.cos(rP);
    let x2 = x1 * Math.cos(rY) + z1 * Math.sin(rY),
      y2 = y1,
      z2 = -x1 * Math.sin(rY) + z1 * Math.cos(rY);
    let xRot = x2 * Math.cos(rR) - y2 * Math.sin(rR),
      yRot = x2 * Math.sin(rR) + y2 * Math.cos(rR);
    const scale = 250 / (250 - z2);
    return { ...p, cx: 150 + xRot * scale, cy: 150 - yRot * scale, scale };
  });

  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>3 DOF: Fixed Point Rigid Body</h3>
        <p style={{ fontSize: "14px", color: "#4b5563" }}>
          Translation locked. Pivot around origin.
        </p>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff7ed",
            borderRadius: "6px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              Pitch:{" "}
              <input
                type="range"
                min="-180"
                max="180"
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
              />
            </label>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              Yaw:{" "}
              <input
                type="range"
                min="-180"
                max="180"
                value={yaw}
                onChange={(e) => setYaw(e.target.value)}
              />
            </label>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              Roll:{" "}
              <input
                type="range"
                min="-180"
                max="180"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 300 300"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <circle
          cx="150"
          cy="150"
          r="15"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4"
        />
        <line
          x1={projected[0].cx}
          y1={projected[0].cy}
          x2={projected[1].cx}
          y2={projected[1].cy}
          stroke="#4b5563"
          strokeWidth="3"
        />
        <line
          x1={projected[0].cx}
          y1={projected[0].cy}
          x2={projected[2].cx}
          y2={projected[2].cy}
          stroke="#4b5563"
          strokeWidth="3"
        />
        <line
          x1={projected[1].cx}
          y1={projected[1].cy}
          x2={projected[2].cx}
          y2={projected[2].cy}
          stroke="#4b5563"
          strokeWidth="3"
        />
        {projected.map((p) => (
          <circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={p.id === "P1" ? 8 : 6 * p.scale}
            fill={p.color}
          />
        ))}
      </svg>
    </div>
  );
}

// --- 7. Fixed Axis Rigid Body (1 DOF) [3D Volume] ---
function FixedAxis1DOF() {
  const [theta, setTheta] = useState(0);

  const orig = [
    { id: "T1", x: 80, y: 30, z: 80 },
    { id: "T2", x: 40, y: 30, z: 80 },
    { id: "T3", x: 40, y: -30, z: 80 },
    { id: "T4", x: 80, y: -30, z: 80 },
    { id: "B1", x: 80, y: 30, z: 20 },
    { id: "B2", x: 40, y: 30, z: 20 },
    { id: "B3", x: 40, y: -30, z: 20 },
    { id: "B4", x: 80, y: -30, z: 20 },
  ];

  const projected = orig.map((p) => {
    const rad = (theta * Math.PI) / 180;
    const xRot = p.x * Math.cos(rad) - p.y * Math.sin(rad);
    const yRot = p.x * Math.sin(rad) + p.y * Math.cos(rad);
    const tilt = (60 * Math.PI) / 180;
    const finalY = yRot * Math.cos(tilt) - p.z * Math.sin(tilt);
    const finalZ = yRot * Math.sin(tilt) + p.z * Math.cos(tilt);
    const scale = 350 / (350 - finalZ);
    return {
      id: p.id,
      cx: 150 + xRot * scale,
      cy: 150 - finalY * scale,
      z: finalZ,
    };
  });

  const getLine = (id1, id2) => {
    const p1 = projected.find((p) => p.id === id1);
    const p2 = projected.find((p) => p.id === id2);
    return (
      <line
        x1={p1.cx}
        y1={p1.cy}
        x2={p2.cx}
        y2={p2.cy}
        stroke="#3b82f6"
        strokeWidth="2.5"
      />
    );
  };

  const sortedNodes = [...projected].sort((a, b) => a.z - b.z);

  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>1 DOF: Fixed Axis (3D Body)</h3>
        <p style={{ fontSize: "14px", color: "#4b5563" }}>
          Only Yaw rotation is independent.
        </p>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            borderLeft: "4px solid #3b82f6",
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Rotation Angle (θ): {theta}°
            <input
              type="range"
              min="0"
              max="360"
              value={theta}
              onChange={(e) => setTheta(e.target.value)}
            />
          </label>
        </div>
      </div>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 300 300"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <line
          x1="150"
          y1="30"
          x2="150"
          y2="270"
          stroke="#9ca3af"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse
          cx="150"
          cy="115"
          rx="60"
          ry="30"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="4"
        />
        {getLine("T1", "T2")} {getLine("T2", "T3")} {getLine("T3", "T4")}{" "}
        {getLine("T4", "T1")}
        {getLine("B1", "B2")} {getLine("B2", "B3")} {getLine("B3", "B4")}{" "}
        {getLine("B4", "B1")}
        {getLine("T1", "B1")} {getLine("T2", "B2")} {getLine("T3", "B3")}{" "}
        {getLine("T4", "B4")}
        {sortedNodes.map((p) => (
          <circle key={p.id} cx={p.cx} cy={p.cy} r="4" fill="#111" />
        ))}
      </svg>
    </div>
  );
}

// --- 8. Simple Pendulum (1 DOF) ---
function SimplePendulum() {
  const [theta, setTheta] = useState(0);
  const px = 150,
    py = 30,
    len = 180;
  const rad = (theta * Math.PI) / 180;
  const bx = px + len * Math.sin(rad),
    by = py + len * Math.cos(rad);

  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>1 DOF: Simple Pendulum</h3>
        <p style={{ fontSize: "14px", color: "#4b5563" }}>
          Constraint: |r| = l
        </p>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f0fdf4",
            borderRadius: "6px",
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontWeight: "bold",
            }}
          >
            Swing:{" "}
            <input
              type="range"
              min="-90"
              max="90"
              value={theta}
              onChange={(e) => setTheta(e.target.value)}
            />
          </label>
        </div>
      </div>
      <svg
        width="100%"
        height="260"
        viewBox="0 0 300 260"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <path
          d={`M ${px - len} ${py} A ${len} ${len} 0 0 0 ${px + len} ${py}`}
          fill="none"
          stroke="#d1d5db"
          strokeDasharray="4"
        />
        <line
          x1={px}
          y1={py}
          x2={bx}
          y2={by}
          stroke="#4b5563"
          strokeWidth="3"
        />
        <circle cx={px} cy={py} r="6" fill="#111" />
        <circle cx={bx} cy={by} r="14" fill="#3b82f6" />
      </svg>
    </div>
  );
}

// --- 9. Conical Pendulum (2 DOF) ---
function ConicalPendulum() {
  const [theta, setTheta] = useState(45),
    [phi, setPhi] = useState(60);
  const px = 150,
    py = 50,
    len = 160;
  const radT = (theta * Math.PI) / 180,
    radP = (phi * Math.PI) / 180;
  const x3D = len * Math.sin(radT) * Math.cos(radP),
    y3D = len * Math.cos(radT),
    z3D = len * Math.sin(radT) * Math.sin(radP);

  const tilt = (20 * Math.PI) / 180;
  const projY = y3D * Math.cos(tilt) - z3D * Math.sin(tilt);
  const pathRX = len * Math.sin(radT),
    pathRY = pathRX * Math.cos(tilt),
    pathCY = py + y3D * Math.cos(tilt);

  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>2 DOF: Conical Pendulum</h3>
        <p style={{ fontSize: "14px", color: "#4b5563" }}>
          Constraint: x² + y² + z² = l²
        </p>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#eff6ff",
            borderRadius: "6px",
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            Swing (θ):{" "}
            <input
              type="range"
              min="5"
              max="85"
              value={theta}
              onChange={(e) => setTheta(e.target.value)}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "13px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Orbit (φ):{" "}
            <input
              type="range"
              min="0"
              max="360"
              value={phi}
              onChange={(e) => setPhi(e.target.value)}
            />
          </label>
        </div>
      </div>
      <svg
        width="100%"
        height="280"
        viewBox="0 0 300 280"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <ellipse
          cx={px}
          cy={pathCY}
          rx={pathRX}
          ry={pathRY}
          fill="rgba(59,130,246,0.05)"
          stroke="#d1d5db"
          strokeDasharray="4"
        />
        <line
          x1={px}
          y1={py}
          x2={px + x3D}
          y2={py + projY}
          stroke="#4b5563"
          strokeWidth="3"
        />
        <circle cx={px} cy={py} r="6" fill="#111" />
        <circle
          cx={px + x3D}
          cy={py + projY}
          r="12"
          fill="#3b82f6"
          stroke="#1e40af"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

// --- 10. Dumbbell in Space (5 DOF) ---
function Dumbbell5DOF() {
  const [tx, setTx] = useState(0),
    [ty, setTy] = useState(0),
    [tz, setTz] = useState(0);
  const [pitch, setPitch] = useState(30),
    [yaw, setYaw] = useState(45);

  const proj = (p) => {
    const tilt = (15 * Math.PI) / 180;
    const projY = p.y * Math.cos(tilt) - p.z * Math.sin(tilt),
      projZ = p.y * Math.sin(tilt) + p.z * Math.cos(tilt);
    const scale = 300 / (300 - projZ);
    return { cx: 150 + p.x * scale, cy: 150 - projY * scale, scale, z: projZ };
  };

  const radP = (pitch * Math.PI) / 180,
    radY = (yaw * Math.PI) / 180,
    len = 100;
  const p1 = proj({ x: tx, y: ty, z: tz });
  const p2 = proj({
    x: tx + len * Math.cos(radP) * Math.cos(radY),
    y: ty + len * Math.sin(radP),
    z: tz + len * Math.cos(radP) * Math.sin(radY),
  });
  const sorted = [
    { ...p1, id: "P1", c: "#3b82f6" },
    { ...p2, id: "P2", c: "#ef4444" },
  ].sort((a, b) => a.z - b.z);

  return (
    <div className="simulation-wrapper">
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ marginTop: 0 }}>5 DOF: Dumbbell</h3>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#eff6ff",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          <b style={{ fontSize: "13px" }}>Translation (P1)</b>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <input
              type="range"
              min="-60"
              max="60"
              value={tx}
              onChange={(e) => setTx(Number(e.target.value))}
            />
            <input
              type="range"
              min="-60"
              max="60"
              value={ty}
              onChange={(e) => setTy(Number(e.target.value))}
            />
            <input
              type="range"
              min="-60"
              max="60"
              value={tz}
              onChange={(e) => setTz(Number(e.target.value))}
            />
          </div>
        </div>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fef2f2",
            borderRadius: "6px",
          }}
        >
          <b style={{ fontSize: "13px" }}>Rotation (P2 Orbit)</b>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <input
              type="range"
              min="-90"
              max="90"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
            />
            <input
              type="range"
              min="0"
              max="360"
              value={yaw}
              onChange={(e) => setYaw(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 300 300"
        style={{
          background: "#f9fafb",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <line
          x1={p1.cx}
          y1={p1.cy}
          x2={p2.cx}
          y2={p2.cy}
          stroke="#4b5563"
          strokeWidth="4"
        />
        {sorted.map((p) => (
          <circle key={p.id} cx={p.cx} cy={p.cy} r={12 * p.scale} fill={p.c} />
        ))}
      </svg>
    </div>
  );
}

// --- Master Dashboard Architecture ---
export default function MechanicsDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const views = [
    { title: "1. Particle on a Circle (1 DOF)", component: <CircleDOF /> },
    {
      title: "2. Five Free Particles (10 DOF)",
      component: <FiveFreeParticles />,
    },
    { title: "3. Rigid Rod in a Plane (3 DOF)", component: <RigidRod2D /> },
    { title: "4. Rigid Body in 3D (6 DOF CSS)", component: <RigidBodyCSS /> },
    { title: "5. Rigid Body Math Matrix (6 DOF)", component: <RigidBodySVG /> },
    { title: "6. Fixed Point Rigid Body (3 DOF)", component: <FixedPoint3D /> },
    { title: "7. Fixed Axis (3D Body) (1 DOF)", component: <FixedAxis1DOF /> },
    { title: "8. Simple Pendulum (1 DOF)", component: <SimplePendulum /> },
    { title: "9. Conical Pendulum (2 DOF)", component: <ConicalPendulum /> },
    { title: "10. Dumbbell in Space (5 DOF)", component: <Dumbbell5DOF /> },
  ];

  return (
    <>
      <style>
        {`
          .dashboard-container {
            display: flex;
            gap: 30px;
            margin-top: 20px;
            flex-direction: row;
          }
          .sidebar {
            width: 300px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex-shrink: 0;
          }
          .viewport {
            flex: 1;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .simulation-wrapper {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
          }
          @media (max-width: 768px) {
            .dashboard-container {
              flex-direction: column;
            }
            .sidebar {
              width: 100%;
            }
            .viewport {
              padding: 15px;
            }
          }
        `}
      </style>

      <div
        style={{
          padding: "20px",
          fontFamily: "sans-serif",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "10px",
            fontSize: "24px",
          }}
        >
          Interactive Mechanics Engine
        </h1>

        <div className="dashboard-container">
          {/* Hub Navigation Menu */}
          <div className="sidebar">
            {views.map((view, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: activeIndex === index ? "bold" : "normal",
                  backgroundColor:
                    activeIndex === index ? "#3b82f6" : "#f3f4f6",
                  color: activeIndex === index ? "#ffffff" : "#374151",
                  transition: "all 0.2s ease",
                  fontSize: "14px",
                }}
              >
                {view.title}
              </button>
            ))}
          </div>

          {/* Active Engine Viewport */}
          <div className="viewport">{views[activeIndex].component}</div>
        </div>
      </div>
    </>
  );
}
