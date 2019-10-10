using System;
using System.Collections.Generic;
using System.Text;
using DevIO.Business.Models;
using DevIO.Business.Models.Validations;
using FluentValidation;
using FluentValidation.Results;

namespace DevIO.Business.Services
{
    public abstract class BaseService
    {
        protected void Notificar(string mensagem)
        {
            //Propagar o erro até a camada de apresentação

        }

        protected void Notificar(ValidationResult validationResult)
        {
            foreach (var error in validationResult.Errors)
            {
                Notificar(error.ErrorMessage);
            }
        }

        protected bool ExecutarValidacao<TV, TE>(TV  validacao, TE entidade) where TV : AbstractValidator<TE> where TE : Entity
        {
            var validator = validacao.Validate(entidade);

            if (validator.IsValid) return true;
            
            Notificar(validator);
            return false;
        }
    }
}
