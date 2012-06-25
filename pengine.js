var ParticleEngine = (function() {

    var screenWidth;
    var screenHeight;
    var canvas;
    var ctx;

    var acceleration;
    var particles;
    var particleSize;
    var numParticlesToAddAtOnce;
    var emitLocation;
    var velocityRange;

    var runPE = function()
    {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        for(var p=0; p<numParticlesToAddAtOnce; p++)
        {
            addParticle();
        }
        
        for(var i=0; i<particles.length; i++)
        {
            var particle = particles[i];
            drawParticle(particle);
            updateParticle(particle, i);
        }
        document.getElementById("particleCount").innerHTML = "Number of particles: "+particles.length;
    };

    var addParticle = function(particle)
    {
        var particle = createParticle();
        particles.push(particle);
    };

    var createParticle = function()
    {
        var vRangeX = velocityRange["xRange"];
        var vRangeY = velocityRange["yRange"];

        var particle = {
            location: {
                x: emitLocation["x"],
                y: emitLocation["y"]
            },
            velocity: {
                x:  vRangeX[0]+(Math.random()*vRangeX[1]*2),
                y:  vRangeY[0]+(Math.random()*vRangeY[1]*2)
            }
        }
        
        return particle;
    };

    var updateParticle = function(particle, index)
    {
        particle.location["x"]+=particle.velocity["x"];
        particle.location["y"]+=particle.velocity["y"];
        particle.velocity["x"]+=acceleration["x"];
        particle.velocity["y"]+=acceleration["y"];

        if(particle.location["x"] > screenWidth+particleSize || particle.location["y"]+particleSize > screenHeight)
        {
            particles.splice(index, 1);
        }

        return { x: particle.location["x"], y: particle.location["y"] };
    };

    var drawParticle = function(particle)
    {
        ctx.fillStyle = "#0AC";
        ctx.beginPath();
        ctx.arc(particle.location["x"], particle.location["y"], particleSize, Math.PI*2, 0, true);
        ctx.closePath();
        ctx.fill();
    };

    return {

        init: function()
        {
            canvas = document.getElementById("mainCanvas");
            ctx = canvas.getContext("2d");
            //uncomment for fullscreen
            //canvas.width = document.width;
            //canvas.height = document.height;
            screenWidth = canvas.width;
            screenHeight = canvas.height;

            emitLocation = { x: screenWidth/2, y: screenHeight/2 };
            acceleration = { x: 0, y: 0.15 };
            velocityRange = { xRange: [-3, 3], yRange: [-1, -3] };
            particleSize = 2;
            numParticlesToAddAtOnce = 10;
            particles = new Array();
        },

        run: function()
        {
            setInterval(runPE, 30);
        }

    }

})();

