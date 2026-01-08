import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  form!: FormGroup;
  isSending: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(0)]],
    });
  }

  async submit() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSending = true;

    try {
      // NOTA: Formspree a veces requiere un ID como 'mnqodvve' en lugar del email directo.
      const response = await fetch('https://formspree.io/f/meeowqov', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(this.form.value),
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Mensaje enviado con éxito! Revisaremos tu propuesta pronto.');
        this.form.reset({ service: '' });
      } else {
        // Si Formspree devuelve un error (ej. cuenta no verificada)
        console.error('Error de Formspree:', data);
        alert(
          'Error del servidor: ' +
            (data.error || 'Asegúrate de haber confirmado tu correo en Formspree.')
        );
      }
    } catch (e) {
      console.error('Error de red:', e);
      alert('Error de conexión. Revisa tu internet o la configuración del envío.');
    } finally {
      this.isSending = false;
    }
  }

  private markAllAsTouched() {
    Object.values(this.form.controls).forEach((c) => c.markAsTouched());
  }
}
