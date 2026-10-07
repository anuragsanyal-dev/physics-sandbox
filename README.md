# Physics Sandbox

**Interactive Computational Physics Laboratory**

Physics Sandbox demonstrates not only what physics equations predict, but where simplified theoretical models differ from numerical simulations of more realistic physical systems.

## Overview

Physics Sandbox is a browser-based educational application for exploring five classical-physics topics through interactive controls, visualizations, graphs, telemetry, saved runs, and CSV export. It combines analytical models with numerical integration and makes model assumptions visible alongside results. It has no backend; simulations run in the browser and saved runs use local storage.

## Features

- Five interactive laboratories with presets, playback controls, graphs, telemetry, and Theory & Math panels.
- Analytical-versus-numerical comparisons where supported.
- Canvas visualization and Recharts-based time-series analysis.
- Saved runs stored locally per laboratory.
- CSV export for simulation histories.
- SI-based controls, display units, and parameter validation.

## Laboratories

| Laboratory | Models and analyses |
| --- | --- |
| Projectile Motion | Ideal analytical trajectories; Real World quadratic-drag and wind model using RK4; Ideal, Real World, and Compare modes; trajectory, position, velocity, acceleration, and energy views. |
| Gravity & Orbital Mechanics | Newtonian 2D N-body gravity, softened close-range force calculation, Velocity Verlet, barycenter, orbital classification, and conservation tracking. |
| Collisions | One-dimensional motion, event/impact interpolation, restitution, impulse, center-of-mass motion, momentum and kinetic-energy analysis. |
| Pendulum | Small-angle analytical solution and nonlinear RK4 motion, optional linear angular damping, finite-amplitude reference and period measurement. |
| Wave & Interference | Analytical travelling waves, linear superposition, standing waves, harmonics, beats, and idealized fixed/free reflection. |

## Scientific Models

Analytical models are evaluated directly within their stated assumptions. Numerical methods approximate differential-equation evolution through finite steps; their results depend on the model, timestep, and initial conditions. The application does not claim perfect real-world behavior.

### Numerical Methods

- **RK4** evaluates intermediate slopes to estimate each step for quadratic-drag projectile motion and nonlinear pendulum motion.
- **Velocity Verlet** advances the gravity lab's Newtonian N-body system using a symplectic-style method suited to mechanical systems.
- **Fixed-timestep simulation** separates physical step size from playback speed in numerical labs.
- **Impact interpolation** locates a one-dimensional collision event between simulation samples before applying analytical collision outcome equations.

Analytical examples include ideal projectile equations, the small-angle pendulum solution, instantaneous 1D collision outcomes, and sinusoidal wave equations. The collision lab still advances object positions over simulation time and detects the impact event.

## Architecture

The application is organized around this data flow:

```text
UI and controls
      ↓
Lab state
      ↓
Physics engines and numerical methods
      ↓
Derived quantities and analysis
      ↓
Canvas, graphs, telemetry, saved runs, and CSV
```

Physics calculations are kept separate from React rendering wherever practical. The frontend is a client-side React and TypeScript application bundled by Vite. Simulation histories are visualized with Canvas and Recharts; no server or database is required.

## Getting Started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL when the server starts. To create the production build:

```bash
npm run build
```

## Testing

Run the physics and utility test suite with Vitest:

```bash
npm test
```

The suite covers analytical results, numerical behavior, conservation properties, validation, CSV serialization, and shared number formatting. Final Milestone 7 verification: **146 tests across 9 files, all passing**.

## Project Structure

```text
src/
  app/                 Application shell and laboratory catalog
  components/           Shared controls, graphs, layout, simulation UI
  data/                 Presets and environment data
  labs/                 Laboratory interfaces, canvases, graphs, and CSV
  numerical/            Shared numerical integrators
  physics/              Domain engines, analyses, types, and physics tests
  styles/               Global visual system and laboratory styles
  utils/                Shared formatting and CSV utilities
  visualization/        Coordinate transforms
```

## Validation Highlights

These values are documented by the project's automated physics tests:

- **Sun–Earth-like orbit:** analytical period about 31,557,671.5 s; Velocity Verlet measured period about 31,557,600 s; relative period error about 2.265 × 10⁻⁶.
- **1D collision:** with `mA = 2 kg`, `mB = 3 kg`, `uA = +6 m/s`, `uB = −1 m/s`, and `e = 0.5`, the outcome is `vA = −0.3 m/s`, `vB = +3.2 m/s`; momentum is 9 kg·m/s before and after.
- **Pendulum:** for `L = 1 m`, `g = 9.81 m/s²`, and `θ₀ = 90°`, small-angle period is about 2.0060666807 s, finite-amplitude reference about 2.3678419476 s, and measured nonlinear period about 2.3678419474 s.
- **Waves:** equal 1 m waves add to 2 m under constructive interference; a 180° phase difference cancels equal waves; 4 Hz and 4.5 Hz components have 0.5 Hz beat frequency.
- **Ideal projectile test case:** `v₀ = 10 m/s`, `θ = 45°`, `y₀ = 0`, and `g = 9.81 m/s²` produce a flight time of about 1.4416 s and horizontal range of about 10.1937 m.

## Known Limitations

- **Projectile:** constant gravity and air density, flat ground, point-mass motion, constant drag coefficient, quadratic drag, no spin/Magnus force, lift, Coriolis effect, or altitude-dependent atmosphere.
- **Gravity:** 2D Newtonian point masses, numerical softening, simplified initial conditions rather than live ephemerides; rendered body radii are not necessarily to physical scale.
- **Collisions:** one-dimensional instantaneous impact outcomes; no rotation, deformation, or frictional contact model. Restitution summarizes collision elasticity.
- **Pendulum:** point mass on a massless rigid rod/string with a fixed pivot and uniform gravity; damping is a simplified linear angular term, not an aerodynamic flow model.
- **Waves:** one-dimensional ideal linear sinusoidal components with no dispersion or nonlinear effects and idealized boundaries.
- **Numerics:** finite timesteps introduce approximation and may affect long-run conservation. Playback rate changes presentation timing, not the configured physics model.
- **Browser platform:** saved runs are local to the browser profile, and CSV download behavior depends on browser permissions and settings.
- **Build performance:** laboratory-level lazy loading keeps the initial JavaScript bundle at about 235 kB and the largest charting chunk at about 394 kB (uncompressed); the current build no longer emits Vite's 500 kB chunk warning.

## Technology Stack

React, TypeScript, Vite, Tailwind CSS, HTML5 Canvas, Recharts, Vitest, and browser local storage. There is no backend or authentication service.

