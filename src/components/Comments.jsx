import React from 'react'

export const Comments = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-24 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.amber.500),white)] opacity-10" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-amber-600/10 ring-1 ring-amber-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img className="mx-auto h-12" src="/img/banana.svg"/>
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-medium leading-8 text-gray-900 sm:text-1xl sm:leading-9">
            <p>
            "La idea de una stationery store puede parecer aburrida y predecible, pero en Bnana creemos en desafiar esa percepción. Desde 1997, creando un universo vibrante, emocionante, lleno de colores, diseños diversos, elegancia y comodidad. Descubre nuestro mundo en constante evolución y déjate sorprender."
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-10 w-10 rounded-full"
              src='./img/ceo.jpg'
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Julieth Mendes</div>
              <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-gray-600">CEO Fundadora</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
