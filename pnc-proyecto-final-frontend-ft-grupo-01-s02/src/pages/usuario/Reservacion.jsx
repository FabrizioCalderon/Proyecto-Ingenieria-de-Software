// src/pages/reservas/Reservacion.jsx

import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import CalendarioReservas from "../../components/CalendarioReservas";
import SelectorHoras from "../../components/SelectorHoras";
import Button from "../../components/Button";
import Input from "../../components/Input";

import estadioImg from "/src/assets/estadio-de-deportes.jpg";

function Reservacion() {
  const [opciones, setOpciones] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [formularioValido, setFormularioValido] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  // Simulamos llamada a API: zonas / lugares / etc
  useEffect(() => {
    const datosSimulados = [
      { label: "San Salvador", value: "SV" },
      { label: "Santa Tecla", value: "ST" },
      { label: "Soyapango", value: "SO" },
    ];
    setOpciones(datosSimulados);
  }, []);

  // Fechas ocupadas (desde API)
  useEffect(() => {
    const fechas = ["2025-06-15", "2025-06-17", "2025-06-20"];
    setFechasOcupadas(fechas);
  }, []);

  const canchaSeleccionada = {
    nombre: "Cancha Fútbol 5",
    lugar: "Complejo Deportivo A",
    zona: "San Salvador",
    precioPorHora: 10.0,
  };

  const usuario = {
    nombre: "Jennifer López",
    correo: "jenn@example.com",
  };

  // Horarios ocupados según fecha
  useEffect(() => {
    if (!selectedDate) return;
    const fechaStr = selectedDate.toISOString().split("T")[0];

    const reservasPorFecha = {
      "2025-06-16": ["10:00", "13:00"],
      "2025-06-18": ["08:00", "12:00", "15:00"],
    };

    setHorasOcupadas(reservasPorFecha[fechaStr] || []);
    setSelectedHours([]); // reiniciar selección cuando cambia fecha
  }, [selectedDate]);

  const toggleHora = (hora) => {
    setSelectedHours((prev) =>
      prev.includes(hora)
        ? prev.filter((h) => h !== hora)
        : [...prev, hora].sort()
    );
  };

  const calcularTotal = () =>
    selectedHours.length * canchaSeleccionada.precioPorHora;

  const horaInicio = selectedHours[0] || null;
  const horaFin =
    selectedHours.length > 0
      ? `${parseInt(selectedHours[selectedHours.length - 1]) + 1}:00`
      : null;

  // Validaciones de tarjeta
  const validarNumeroTarjeta = (num) => /^\d{16}$/.test(num);
  const validarVencimiento = (v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v);
  const validarCVV = (c) => /^\d{3}$/.test(c);

  useEffect(() => {
    const esValido =
      validarNumeroTarjeta(numeroTarjeta) &&
      validarVencimiento(vencimiento) &&
      validarCVV(cvv);

    setFormularioValido(esValido);
  }, [numeroTarjeta, vencimiento, cvv]);

  const handlePagar = () => {
    if (formularioValido && selectedDate && selectedHours.length > 0) {
      setPagoExitoso(true);

      // Limpiar campos
      setNumeroTarjeta("");
      setVencimiento("");
      setCvv("");
      setSelectedDate(null);
      setSelectedHours([]);
      setSeleccionado("");

      setTimeout(() => {
        setPagoExitoso(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--canchitas-bg)] px-4 py-10 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Intro / pasos */}
        <section className="canchitas-section space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[var(--canchitas-primary)]">
            Crear reservación
          </h1>
          <p className="text-sm text-[var(--canchitas-text-muted)] text-center">
            Sigue estos pasos para reservar tu cancha de forma rápida y segura.
          </p>

          <ul className="mt-2 space-y-1 text-sm text-[var(--canchitas-text)]">
            <li className="font-semibold">
              Pasos para reservar tu cancha:
            </li>
            <li>
              <span className="font-medium">1.</span> Selecciona tu zona o
              ciudad y el lugar donde deseas alquilar una cancha.
            </li>
            <li>
              <span className="font-medium">2.</span> Elige el tipo de cancha y
              la cancha específica que mejor se adapte a tu equipo.
            </li>
            <li>
              <span className="font-medium">3.</span> Selecciona la fecha y el
              horario disponible que prefieras.
            </li>
            <li>
              <span className="font-medium">4.</span> Ingresa tu método de pago
              y confirma la reservación.
            </li>
            <li className="font-semibold">
              ¡Listo! Solo te queda llegar a jugar.
            </li>
          </ul>
        </section>

        {/* Layout principal: izquierda (cancha+calendario) / derecha (datos+pago) */}
        <section className="grid lg:grid-cols-[2fr,1.5fr] gap-6 items-start">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Selección de cancha */}
            <div className="canchitas-section space-y-4">
              <h2 className="text-lg font-semibold text-[var(--canchitas-primary)]">
                1. Elige tu cancha
              </h2>

              <div className="grid md:grid-cols-2 gap-4 items-start">
                <div className="space-y-3">
                  <Dropdown
                    label="Selecciona zona"
                    options={opciones}
                    value={seleccionado}
                    onChange={setSeleccionado}
                  />
                  <Dropdown
                    label="Selecciona el lugar"
                    options={opciones}
                    value={seleccionado}
                    onChange={setSeleccionado}
                  />
                  <Dropdown
                    label="Selecciona el tipo de cancha"
                    options={opciones}
                    value={seleccionado}
                    onChange={setSeleccionado}
                  />
                  <Dropdown
                    label="Selecciona la cancha"
                    options={opciones}
                    value={seleccionado}
                    onChange={setSeleccionado}
                  />
                </div>

                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={estadioImg}
                    alt="Cancha seleccionada"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Calendario y horarios */}
            <div className="canchitas-section space-y-4">
              <h2 className="text-lg font-semibold text-[var(--canchitas-primary)]">
                2. Elige fecha y horario
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Calendario */}
                <div>
                  <p className="text-sm font-medium text-[var(--canchitas-primary)] mb-2">
                    Calendario de reservas
                  </p>
                  <CalendarioReservas
                    fechasOcupadas={fechasOcupadas}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                  />
                  {selectedDate && (
                    <p className="mt-2 text-xs text-[var(--canchitas-text-muted)]">
                      Fecha seleccionada:{" "}
                      <span className="font-semibold">
                        {selectedDate.toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>

                {/* Horarios */}
                <div>
                  <p className="text-sm font-medium text-[var(--canchitas-primary)] mb-2">
                    Horarios disponibles
                  </p>

                  {selectedDate ? (
                    <>
                      <SelectorHoras
                        horasOcupadas={horasOcupadas}
                        horasSeleccionadas={selectedHours}
                        onHoraClick={toggleHora}
                      />

                      {selectedHours.length > 0 && (
                        <div className="mt-4 space-y-1 text-sm text-[var(--canchitas-text)]">
                          <p>
                            Hora de inicio:{" "}
                            <strong>{horaInicio}</strong>
                          </p>
                          <p>
                            Hora de fin: <strong>{horaFin}</strong>
                          </p>
                          <p>
                            Total a pagar:{" "}
                            <strong>
                              ${calcularTotal().toFixed(2)}
                            </strong>
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-[var(--canchitas-text-muted)]">
                      Selecciona una fecha para ver los horarios disponibles.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Datos personales */}
            <div className="canchitas-section space-y-3">
              <h2 className="text-lg font-semibold text-[var(--canchitas-primary)]">
                3. Datos personales
              </h2>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-[var(--canchitas-text)]">
                <div>
                  <p className="font-medium">Usuario</p>
                  <p>{usuario.nombre}</p>
                </div>
                <div>
                  <p className="font-medium">Correo</p>
                  <p>{usuario.correo}</p>
                </div>
              </div>
            </div>

            {/* Detalles de compra */}
            <div className="canchitas-section space-y-3">
              <h2 className="text-lg font-semibold text-[var(--canchitas-primary)]">
                4. Detalles de la reserva
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-[var(--canchitas-text)]">
                <div>
                  <p>
                    <strong>Lugar:</strong> {canchaSeleccionada.lugar}
                  </p>
                  <p>
                    <strong>Zona:</strong> {canchaSeleccionada.zona}
                  </p>
                  <p>
                    <strong>Cancha:</strong> {canchaSeleccionada.nombre}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "-"}
                  </p>
                  <p>
                    <strong>Entrada:</strong>{" "}
                    {selectedHours.length > 0 ? horaInicio : "-"}
                  </p>
                  <p>
                    <strong>Salida:</strong>{" "}
                    {selectedHours.length > 0 ? horaFin : "-"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p>
                    <strong>Precio total:</strong>{" "}
                    {selectedHours.length > 0
                      ? `$${calcularTotal().toFixed(2)}`
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Forma de pago */}
            <div className="canchitas-section space-y-4">
              <h2 className="text-lg font-semibold text-[var(--canchitas-primary)]">
                5. Forma de pago
              </h2>

              <Dropdown
                label="Método de pago"
                options={opciones}
                value={seleccionado}
                onChange={setSeleccionado}
              />

              <div className="grid sm:grid-cols-3 gap-3">
                <Input
                  id="numeroTarjeta"
                  label="Número de tarjeta"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={numeroTarjeta}
                  maxLength={16}
                  onChange={(e) =>
                    setNumeroTarjeta(e.target.value.replace(/\D/g, ""))
                  }
                />
                <Input
                  id="vencimiento"
                  label="Vencimiento"
                  placeholder="MM/AA"
                  value={vencimiento}
                  maxLength={5}
                  onChange={(e) => setVencimiento(e.target.value)}
                />
                <Input
                  id="cvv"
                  label="CVV"
                  type="password"
                  value={cvv}
                  maxLength={3}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  disabled={
                    !formularioValido ||
                    !selectedDate ||
                    selectedHours.length === 0
                  }
                  onClick={handlePagar}
                >
                  Confirmar y pagar{" "}
                  {selectedHours.length > 0 &&
                    `- $${calcularTotal().toFixed(2)}`}
                </Button>

                <p className="text-xs text-center text-[var(--canchitas-text-muted)]">
                  Tu pago se procesa de forma segura. No almacenamos los datos
                  de tu tarjeta.
                </p>

                {pagoExitoso && (
                  <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-300 px-4 py-3 text-sm text-emerald-900 flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      ¡Pago realizado con éxito! Tu reservación ha sido
                      confirmada.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Reservacion;
