using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;

namespace DevIO.App.Extensions
{
    [HtmlTargetElement("a", Attributes = "disable-by-claim-name")]
    [HtmlTargetElement("a", Attributes = "disable-by-claim-value")]
    public class DesabilitaLinkByClaimHelper : TagHelper
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public DesabilitaLinkByClaimHelper(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        [HtmlAttributeName("disable-by-claim-name")]
        public string IdentityByClaimName { get; set; }

        [HtmlAttributeName("disable-by-claim-value")]
        public string IdentityByClaimValue { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if(context==null)
                throw new ArgumentNullException(nameof(context));
            if(output==null)
                throw new ArgumentNullException(nameof(output));

            var temAcesso = CustomAuthorize.ValidarClaimsUsuario(_contextAccessor.HttpContext, IdentityByClaimName,
                IdentityByClaimValue);

            if (temAcesso) return;

            output.Attributes.RemoveAll("href");
            output.Attributes.Add(new TagHelperAttribute("style","cursor: not-allowed"));
            output.Attributes.Add(new TagHelperAttribute("title","Você não tem permissão"));
        }
    }
}
